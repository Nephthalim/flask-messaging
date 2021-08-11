from flask import Flask, Blueprint, render_template, request, redirect, url_for, session, jsonify
from flask_socketio import SocketIO, join_room, leave_room, emit
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_, and_, text, desc
from server import db
from server.models.user import User
from server.models.message import Message
from server.models.conversation import Conversation
from flask_cors import CORS, cross_origin
from server import login_required

chat = Blueprint('chat', __name__)


@chat.route("/messages/<conversation_id>", methods=['GET', 'OPTIONS'])
@cross_origin()
@login_required
def get_conversation_messages(conversation_id):
    try:
        result = db.session.query(Message).from_statement(text(
            'SELECT * FROM "message" WHERE conversation={} ORDER BY time_sent ASC'.format(conversation_id))).all()
        messages = []
        for i in list(result):
            messages.append(i._tojson())
        return {'user': session['user'], 'messages': messages}, 201
    except TypeError:
        return {'user': session['user'], 'messages': messages},200
    except:
        return {'msg': 'Server Failure'}, 500

