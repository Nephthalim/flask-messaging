from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import eventlet
from server import db, create_app, login_required
from server.models.message import Message
from flask_socketio import SocketIO, join_room, emit, send, leave_room
from flask_jwt_extended import create_access_token
import bcrypt
from flask_cors import cross_origin
from server.models.user import User

app = create_app('testing')
socketio = SocketIO(app, cors_allowed_origins="*")


def save_message(msg, user, convo):
    msg = Message(msg, user, convo)
    db.session.add(msg)
    db.session.commit()
    return msg._tojson()


@socketio.on('connect')
@cross_origin()
def connect():
    emit("connect", {'msg': 'connected'})
    return 'connect', 1


@socketio.on('disconnect')
def disconnect():
    pass


@socketio.on('message')
@login_required
@cross_origin()
def text(message):
    conversation_id = str(message["conversation_id"])
    msg = save_message(message['msg'], session['user'], conversation_id)
    msg['user'] = session['user']
    emit('message', msg, to=conversation_id)
    return 'sent', 1


@socketio.on('join')
@login_required
@cross_origin()
def join(message):
    conversation_id = str(message["conversation_id"])
    join_room(conversation_id)
    emit('join', {'user': session['user'], 'room': conversation_id})
    return 'joined'

@app.route("/")
def my_index():
    return render_template("index.html")

if __name__ == "__main__":
    socketio.run(app)
