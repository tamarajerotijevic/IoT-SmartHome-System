from flask import Blueprint, request, jsonify
import requests

control_bp=Blueprint(
    "control", 
    __name__
)

@control_bp.route("/light", methods=["POST"])
def control_light():
    data=request.get_json() or {}

    command=data.get("command")

    if command=="ON":
        arduino_command = "LED_ON"

    elif command=="OFF":
        arduino_command = "LED_OFF"
    
    else:

        return jsonify({"message":"Unknown command"}),400

    
    try:
        response = requests.post(
            "http://127.0.0.1:5001/arduino-command",
            json={
                "command":
                    arduino_command
            },
            timeout=3
        )

    except requests.RequestException:

        return jsonify({
            "message":
                "Arduino service is not running"
        }), 503

    return jsonify({
        "message":
            "Light turned ON"
            if command == "ON"
            else "Light turned OFF"
    })