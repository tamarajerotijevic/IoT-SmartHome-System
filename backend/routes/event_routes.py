from flask import Blueprint, jsonify, request

from database import db
from models.event import Event


event_bp = Blueprint(
    "events",
    __name__
)


@event_bp.route("/", methods=["GET"])
def get_events():

    events = Event.query.all()

    result = []

    for event in events:

        result.append({
            "id": event.id,
            "type": event.type,
            "description": event.description,
            "timestamp": event.timestamp
        })

    return jsonify(result)



@event_bp.route("/", methods=["POST"])
def add_event():

    data = request.get_json()

    event = Event(
        type=data["type"],
        description=data["description"]
    )

    db.session.add(event)
    db.session.commit()


    return jsonify({
        "message": "Event created",
        "id": event.id
    }), 201