from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import eventlet
from server import db, create_app, login_required
from server.models.message import Message
from flask_socketio import SocketIO, join_room, emit, send, leave_room
from flask_jwt_extended import create_access_token
import bcrypt
from flask_cors import cross_origin
from server.models.user import User

app = create_app()
socketio = SocketIO(app, cors_allowed_origins="*")


def save_message(msg, user, convo):
    msg = Message(msg, user, convo)
    db.session.add(msg)
    db.session.commit()
    return msg._tojson()



@socketio.on('connect')
def connect():
    print("connected")
    emit("connect", {'msg': 'connected'})
    return 'connect', 1


@socketio.on('disconnect')
def disconnect():
    pass


# @login_required
@socketio.on('message')
def text(message):
    print(message['msg'])
    conversation_id = str(message["conversation_id"])
    msg = save_message(message['msg'], session['user'], conversation_id)
    msg['user'] = session['user']
    emit('message', msg, to=conversation_id)
    return 'sent', 1


# @login_required
@socketio.on('join')
def join(message):
    conversation_id = str(message["conversation_id"])
    print('Joining')
    join_room(conversation_id)
    emit('join', {'user': session['user'], 'room': conversation_id})
    return 'joined',1

@app.route("/")
@app.route("/chat")
def my_index():
    return render_template("index.html")

@app.route("/chat/<chat_id>")
def chat(chat_id):
    print(chat_id)
    return render_template("index.html")

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(400)   
@app.errorhandler(404)   
def not_found(e):   
  return render_template('index.html')

if __name__ == "__main__":
    socketio.run(app)
