import os
from onsmash import app, db
from flask.ext.script import Manager

manager = Manager(app)

@manager.command
def initdb():
    db.create_all()

@manager.command
def dropdb():
    db.drop_all()

if __name__ == "__main__":
    manager.run()