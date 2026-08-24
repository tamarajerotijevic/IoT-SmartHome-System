from models.device import Device
from database import db


def seed_devices():

    if Device.query.count() == 0:

        devices = [

            Device(
                name="Environment Sensor",
                type="DHT22"
            ),

            Device(
                name="Motion Sensor",
                type="PIR"
            ),

            Device(
                name="RFID Reader",
                type="MFRC522"
            ),

            Device(
                name="Camera",
                type="Camera"
            ),

            Device(
                name="Smart Light",
                type="LED"
            )

        ]

        db.session.add_all(devices)
        db.session.commit()

        print("Devices seeded successfully.")

    else:

        print("Devices already exist.")