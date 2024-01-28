from flask import Flask
from app.urls import modules


app = Flask(__name__, template_folder='../templates')


def register_versions():
    app.register_blueprint(modules)
