from database import db
from datetime import datetime


class SensorData(db.Model):

    __tablename__ = "sensor_data"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    temperature = db.Column(
        db.Float
    )

    humidity = db.Column(
        db.Float
    )

    motion = db.Column(
        db.Boolean
    )

    timestamp = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )