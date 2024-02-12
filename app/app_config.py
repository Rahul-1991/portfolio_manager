from flask import Flask
from app.urls import modules
from flask_cors import CORS


app = Flask(__name__, template_folder='../templates')
CORS(app)


def register_versions():
    app.register_blueprint(modules)
