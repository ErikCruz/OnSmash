import os
from flask import Flask
from hashids import Hashids
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config["DEBUG"] = True
app.config["SECRET_KEY"] = "secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(os.getcwd(), 'onsmash.db')
app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "THUMBNAILS")
app.config["ALLOWED_EXTENSIONS"] = ['png', 'jpg', 'jpeg', 'gif']

db = SQLAlchemy(app)
hashids = Hashids(salt=app.config["SECRET_KEY"])

import views
import models