from flask import Blueprint, jsonify, request

from database import db
from models.authorized_card import AuthorizedCard
from models.access_log import AccessLog


access_bp = Blueprint(
    "access",
    __name__
)

# Get all authorized cards

@access_bp.route("/authorized-cards", methods=["GET"])
def get_authorized_cards():

    cards = AuthorizedCard.query.all()

    result = []

    for card in cards:

        result.append({
            "id": card.id,
            "uid": card.uid,
            "owner_name": card.owner_name,
            "created_at": card.created_at
        })

    return jsonify(result)

# Add a new authorized card

@access_bp.route("/authorized-cards", methods=["POST"])
def add_authorized_card():

    data = request.get_json()

    card = AuthorizedCard(
        uid=data["uid"],
        owner_name=data["owner_name"]
    )

    db.session.add(card)
    db.session.commit()

    return jsonify({
        "message": "Card added successfully.",
        "id": card.id
    }), 201

# Get all access logs

@access_bp.route("/logs", methods=["GET"])
def get_access_logs():

    logs = AccessLog.query.order_by(
        AccessLog.timestamp.desc()
    ).limit(10).all()

    result = []

    for log in logs:

        result.append({
            "id": log.id,
            "uid": log.uid,
            "status": log.status,
            "timestamp": log.timestamp
        })

    return jsonify(result)

# Add a new access log

@access_bp.route("/logs", methods=["POST"])
def add_access_log():

    data = request.get_json()

    uid = data["uid"]


    card = AuthorizedCard.query.filter_by(
        uid=uid
    ).first()


    if card:

        status = "GRANTED"

    else:

        status = "DENIED"


    log = AccessLog(
        uid=uid,
        status=status
    )


    db.session.add(log)
    db.session.commit()


    return jsonify({
        "status": status,
        "message": "Access granted" if status=="GRANTED" else "Access denied"
    })