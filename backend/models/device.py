from database import db


class Device(db.Model):

    __tablename__ = "devices"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    type = db.Column(
        db.String(50),
        nullable=False
    )


    def __repr__(self):
        return f"<Device {self.name}>"