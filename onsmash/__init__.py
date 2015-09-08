import os
from flask import Flask

from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["DEBUG"] = True
app.config["SECRET_KEY"] = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + os.path.join(basedir, 'onsmash.db')
db = SQLAlchemy(app)

import views
import models