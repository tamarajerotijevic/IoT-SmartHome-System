from flask import Flask
from config import Config
from database import db

from models.device import Device
from models.sensor_data import SensorData
from models.access_log import AccessLog
from models.user import User
from models.authorized_card import AuthorizedCard
from models.event import Event

from routes.device_routes import device_bp
from routes.sensor_routes import sensor_bp
from routes.access_routes import access_bp
from routes.event_routes import event_bp
from routes.control_routes import control_bp
from routes.auth_routes import auth_bp

from seed import seed_devices

from flask_cors import CORS






app = Flask(__name__)

CORS(app)

app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(
    device_bp,
    url_prefix="/devices"
)

app.register_blueprint(
    sensor_bp,
    url_prefix="/sensor-data"
)

app.register_blueprint(
    access_bp,
    url_prefix="/access"
)

app.register_blueprint(
    event_bp,
    url_prefix="/events"
)

app.register_blueprint(
    control_bp,
    url_prefix="/control"
)

app.register_blueprint(
    auth_bp,
    url_prefix="/auth"
)

@app.route("/")
def home():
    return {
        "message": "Smart Home API is running"
    }


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

        seed_devices()

    app.run(debug=True)