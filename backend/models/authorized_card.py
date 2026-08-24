from database import db
from datetime import datetime


class AuthorizedCard(db.Model):

    __tablename__ = "authorized_cards"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    uid = db.Column(
        db.String(50),
        nullable=False,
        unique=True
    )

    owner_name = db.Column(
        db.String(50),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )