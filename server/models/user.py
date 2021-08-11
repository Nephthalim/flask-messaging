from . import db
from flask_login import UserMixin

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer(), primary_key=True, autoincrement=True)
    username = db.Column('username', db.String(15), unique=True)
    password = db.Column('password', db.LargeBinary(), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def _tojson(self):
        return {
            "id": self.id,
            "username": self.username,
        }
