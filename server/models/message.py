from . import db
from datetime import datetime
from sqlalchemy.sql import func

class Message(db.Model):
    __tablename__ = "message"

    id = db.Column("id",db.Integer(), primary_key = True, autoincrement=True )
    conversation_id = db.Column("conversation",db.Integer(), nullable = False)
    msg = db.Column("msg",db.String(47),nullable = False)
    sender = db.Column("sender",db.Integer(),nullable = False)
    time_sent = db.Column("time_sent",db.DateTime(), nullable = False)

    def __init__(self,msg,sender, conversation_id):
        self.msg = msg
        self.sender = sender
        self.conversation_id = conversation_id
        self.time_sent = datetime.now()
    
    def _tojson(self):
        return {
            "id": self.id,
            "conversation_id": self.conversation_id,
            "msg": self.msg,
            "sender": self.sender,
            "time_sent": self.time_sent.strftime("%b %d, %-I:%M")
        }