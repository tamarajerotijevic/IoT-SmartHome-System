from database import db
from datetime import datetime


class AccessLog(db.Model):

    __tablename__ = "access_logs"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    uid = db.Column(
        db.String(50),
        nullable=False
    )

    status = db.Column(
        db.String(20),
        nullable=False
    )

    timestamp = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )