from flask import Blueprint, request, jsonify

from database import db
from models.user import User


auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data.get("username") or not data.get("password"):
        return jsonify({
            "message": "Username and password are required"
        }), 400

    existing_user = User.query.filter_by(
        username=data["username"]
    ).first()

    if existing_user:
        return jsonify({
            "message": "Username already exists"
        }), 409
    
    user = User(
        username=data["username"],
        password=data["password"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully"
    }), 201



@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data["username"]
    password = data["password"]


    user = User.query.filter_by(
        username=username
    ).first()


    if not user or user.password != password:

        return jsonify({
            "message": "Invalid credentials"
        }), 401



    return jsonify({

        "message": "Login successful",
        "username": user.username

    })