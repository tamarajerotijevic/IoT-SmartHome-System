from flask import Blueprint, jsonify, request
from models.device import Device
from database import db


device_bp = Blueprint("devices", __name__)


# Get all devices

@device_bp.route("/", methods=["GET"])
def get_devices():

    devices = Device.query.all()

    result = []

    for device in devices:
        result.append({
            "id": device.id,
            "name": device.name,
            "type": device.type
        })

    return jsonify(result)


# Get a specific device by ID

@device_bp.route("/<int:id>", methods=["GET"])
def get_device(id):

    device = Device.query.get(id)

    if device is None:
        return jsonify({
            "message": "Uredjaj nije pronadjen"
        }), 404

    return jsonify({
        "id": device.id,
        "name": device.name,
        "type": device.type
    })

#Delete a device by ID


@device_bp.route("/<int:id>", methods=["DELETE"])
def delete_device(id):

    device = Device.query.get(id)

    if device is None:
        return jsonify({
            "message": "Uredjaj nije pronadjen"
        }), 404


    db.session.delete(device)
    db.session.commit()


    return jsonify({
        "message": "Uredjaj obrisan"
    })