from database import db
from datetime import datetime


class Event(db.Model):

    __tablename__ = "events"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    type = db.Column(
        db.String(50),
        nullable=False
    )

    description = db.Column(
        db.String(255),
        nullable=False
    )

    timestamp = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )   