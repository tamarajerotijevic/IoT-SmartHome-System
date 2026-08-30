from flask import Flask,request,jsonify
import threading

import serial
import requests
import time
import random

reader_app=Flask(__name__)

#CONFIG
#True = aplikacija radi bez fizičkog Arduina
#False = koristi pravi Arduino preko COM porta
SIMULATION=True

SERIAL_PORT="COM3"
BAUD_RATE=9600

BACKEND_URL= "http://127.0.0.1:5000"

arduino = None
last_motion = False
serial_write_lock = threading.Lock()

#Serijska konekcija
if not SIMULATION:

    try:
        arduino = serial.Serial(
            SERIAL_PORT,
            BAUD_RATE,
            timeout=1
        )

        time.sleep(2)

        print(
            f"Arduino connected on {SERIAL_PORT}"
        )

    except serial.SerialException as error:

        print(
            "Arduino connection failed:",
            error
        )

        print(
            "Switching to simulation mode."
        )

        SIMULATION = True

def send_to_arduino(command):
    if SIMULATION or arduino is None:

        print(
            f"[SIMULATION] Arduino command: {command}"
        )

        return

    with serial_write_lock:

        arduino.write(
            (command + "\n").encode()
        )


#EVENTS

def send_event(event_type, description):

    try:
        requests.post(
                f"{BACKEND_URL}/events/",
                json={
                    "type": event_type,
                    "description": description
                },
                timeout=3
        )
    except requests.RequestException as error:
        print(
            "Event API error:",
            error
        )

#Podaci sa senzora
def process_sensor_data(
    temperature,
    humidity,
    motion
):
    global last_motion

    try:

        requests.post(
            f"{BACKEND_URL}/sensor-data/",
            json={
                "temperature": temperature,
                "humidity": humidity,
                "motion": motion
            },
            timeout=3
        )
    except requests.RequestException as error:
        print(
            "Sensor API error:",
            error
        )

        return
    #Event se kreira samo kada pokret predje sa False na True
    if motion and not last_motion:

        send_event(
            "MOTION",
            "Movement detected at entrance"
        )

        print(
            "[EVENT] Motion detected"
        )

    last_motion = motion


#RFID
def process_rfid(uid):

    uid = uid.strip().upper()

    try:

        response = requests.post(
            f"{BACKEND_URL}/access/logs",
            json={
                "uid": uid
            },
            timeout=3
        )

    except requests.RequestException as error:

        print(
            "Access API error:",
            error
        )

        return None

    if response.status_code != 200:

        print(
            "Access API error:",
            response.text
        )

        return None

    result = response.json()

    print(
        "Access result:",
        result
    )

    if result["status"] == "GRANTED":

        send_to_arduino("GREEN")

        send_event(
            "ACCESS",
            f"Access granted for card {uid}"
        )

    else:

        send_to_arduino("RED")

        send_event(
            "ACCESS",
            f"Access denied for card {uid}"
        )

    return result

#Real arduino reader
def read_from_arduino():

    while True:
        try:

            line = (
                arduino
                .readline()
                .decode("utf-8")
                .strip()
            )
            if not line:
                continue

            print(
                "ARDUINO:",
                line
            )

            if line.startswith("TEMP:"):

                parts = line.split(",")

                temperature = float(
                    parts[0].split(":")[1]
                )

                humidity = float(
                    parts[1].split(":")[1]
                )

                motion = bool(
                    int(
                        parts[2]
                        .split(":")[1]
                    )
                )

                process_sensor_data(
                    temperature,
                    humidity,
                    motion
                )

            elif line.startswith("CARD:"):

                uid = line.split(
                    ":",
                    1
                )[1]

                process_rfid(uid)

            elif line == "EVENT:LED_ON":

                send_event(
                    "LIGHT",
                    "Light turned ON"
                )

            elif line == "EVENT:LED_OFF":

                send_event(
                    "LIGHT",
                    "Light turned OFF"
                )

        except Exception as error:

            print(
                "Arduino reader error:",
                error
            )


#Simulacija

def simulation_loop():

    print(
        "SMART HOME SIMULATION STARTED"
    )

    counter = 0

    while True:

        temperature = round(
            random.uniform(
                21.0,
                26.0
            ),
            1
        )

        humidity = round(
            random.uniform(
                40.0,
                60.0
            ),
            1
        )

        #simulacija pokreta (na oko 40 sekundi)
        cycle = counter % 20
        motion = 10 <= cycle <= 12


        print(
            f"[SIMULATION] "
            f"TEMP:{temperature},"
            f"HUM:{humidity},"
            f"MOTION:{int(motion)}"
        )

        process_sensor_data(
            temperature,
            humidity,
            motion
        )

        counter += 1

        time.sleep(2)

#komande
@reader_app.route(
    "/arduino-command",
    methods=["POST"]
)
def arduino_command():

    data = request.get_json() or {}

    command = data.get(
        "command"
    )

    if command not in [
        "LED_ON",
        "LED_OFF"
    ]:

        return jsonify({
            "message":
                "Unknown command"
        }), 400

    send_to_arduino(
        command
    )

    # U simulaciji nemamo Arduino koji bi vratio EVENT:LED_ON/OFF, pa događaj kreiramo ovde.
    if SIMULATION:

        if command == "LED_ON":

            send_event(
                "LIGHT",
                "Light turned ON"
            )

        else:

            send_event(
                "LIGHT",
                "Light turned OFF"
            )

    return jsonify({
        "message":
            "Command sent to Arduino"
            if not SIMULATION
            else "Simulated Arduino command"
    })


# RFID SIMULATION
@reader_app.route(
    "/simulate-card",
    methods=["POST"]
)
def simulate_card():

    if not SIMULATION:

        return jsonify({
            "message":
                "RFID simulation is disabled"
        }), 400

    data = request.get_json() or {}

    uid = data.get("uid")

    if not uid:

        return jsonify({
            "message":
                "UID is required"
        }), 400

    result = process_rfid(uid)

    if result is None:

        return jsonify({
            "message":
                "RFID simulation failed"
        }), 500

    return jsonify(result)

#Pokretanje

if __name__ == "__main__":
    if SIMULATION:

        worker = threading.Thread(
            target=simulation_loop,
            daemon=True
        )

    else:

        worker = threading.Thread(
            target=read_from_arduino,
            daemon=True
        )

    worker.start()

    reader_app.run(
        port=5001,
        debug=False,
        use_reloader=False
    )