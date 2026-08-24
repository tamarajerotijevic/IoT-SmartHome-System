from flask import Blueprint, request, jsonify
import requests

control_bp=Blueprint(
    "control", 
    __name__
)

@control_bp.route("/light", methods=["POST"])
def control_light():
    data=request.get_json()

    command=data["command"]

    if command=="ON":
        requests.post("http://127.0.0.1:5001/arduino-command", json={"command":"LED_ON"})
        return jsonify({"message":"Light turned ON"})

    elif command=="OFF":
        requests.post("http://127.0.0.1:5001/arduino-command", json={"command":"LED_OFF"})
        return jsonify({"message":"Light turned OFF"})
    
    else:

        return jsonify({"message":"Unknown command"}),400