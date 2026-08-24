from flask import Flask,request,jsonify
import threading

import serial
import requests

reader_app=Flask(__name__)

last_motion = False

def send_event(event_type, description):

    requests.post(
        "http://127.0.0.1:5000/events/",
        json={
            "type": event_type,
            "description": description
        }
    )

#Za raspberry pi promeniti u arduino = serial.Serial("/dev/ttyACM0", 9600)
arduino = serial.Serial("COM3", 9600)


while True:

    line = arduino.readline().decode().strip()

    print(line)

    #DHT22 and PIR

    if line.startswith("TEMP:"):

        parts = line.split(",")


        temperature = float(parts[0].split(":")[1])
        humidity = float(parts[1].split(":")[1])
        motion = bool(int(parts[2].split(":")[1]))


        requests.post(
        "http://127.0.0.1:5000/sensor-data/",
        json={
            "temperature": temperature,
            "humidity": humidity,
            "motion": motion
        }
        )

        if motion and not last_motion:
            send_event(
                "MOTION",
                "Movement detected at entrance"
            )

        last_motion = motion

        continue

    #RFID
    elif line.startswith("CARD:"):

        uid = line.split(":")[1]

        response = requests.post(
            "http://127.0.0.1:5000/access/logs/",
            json={
                "uid": uid
            }
        )

        if response.status_code == 200:
            result = response.json()
            print(result)
        else:
            print("Access API error:", response.text)
            continue

        if result["status"] == "GRANTED":
            arduino.write(b"GREEN\n")
            send_event(
                "ACCESS",
                f"Access granted for card {uid}"
            )
        else:
            arduino.write(b"RED\n")
            send_event(
                "ACCESS",
                f"Access denied for card {uid}"
            )

        continue



@reader_app.route("/arduino-command", methods=["POST"])
def arduino_command():
    data=request.get_json()
    command=data.get("command")
    arduino.write(
            (command + "\n").encode()
        )    
    return jsonify({"message":"Command sent to Arduino"})

if __name__ == "__main__":
    reader_app.run(
        port=5001,
        debug=True
    )