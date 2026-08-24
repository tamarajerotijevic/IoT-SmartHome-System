from flask import Blueprint, jsonify, request
from models.sensor_data import SensorData
from database import db

# Blueprint for sensor data routes
sensor_bp = Blueprint("sensor_data", __name__)


@sensor_bp.route("/", methods=["GET"])
def get_sensor_data():

    sensors = SensorData.query.all()

    result = []

    for sensor in sensors:

        result.append({
            "id": sensor.id,
            "temperature": sensor.temperature,
            "humidity": sensor.humidity,
            "motion": sensor.motion,
            "timestamp": sensor.timestamp
        })

    return jsonify(result)


@sensor_bp.route("/", methods=["POST"])
def add_sensor_data():

    data = request.get_json()


    sensor = SensorData(
        temperature=data.get("temperature"),
        humidity=data.get("humidity"),
        motion=data.get("motion")
    )

    db.session.add(sensor)
    db.session.commit()

    return jsonify({
        "message": "Sensor data saved.",
        "id": sensor.id
    }), 201