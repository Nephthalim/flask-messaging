from . import db

class Conversation(db.Model):
    __tablename__ = "conversation"

    id = db.Column("id",db.Integer(), primary_key=True, autoincrement=True)
    user_a = db.Column("user_a",db.Integer(), db.ForeignKey('user.id'),nullable = False)
    user_b = db.Column("user_b",db.Integer(), db.ForeignKey('user.id'),nullable = False)
    

    def __init__(self, user_a, user_b):
        self.user_a = user_a
        self.user_b = user_b

    def _tojson(self):
        return {
            "id": self.id,
            "user_a": self.user_a,
            "user_b": self.user_b,
        }