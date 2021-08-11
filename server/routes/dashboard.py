from flask import Flask, render_template, request, redirect, url_for, session, jsonify, Response, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_, and_, text, desc
from sqlalchemy.orm.exc import UnmappedInstanceError
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from server.models.user import User
from server.models.message import Message
from server.models.conversation import Conversation
from server import login_required
from server import db
import json
from flask_cors import CORS, cross_origin

dashboard = Blueprint('dashboard', __name__)


@dashboard.route("/", methods=["GET"])
@login_required
def get_user():
    user = db.session.query(User).from_statement(
        text('SELECT * FROM "user" WHERE id={}'.format(session['user']))).first()
    return user._tojson(), 201


@dashboard.route("/conversations", methods=["GET"])
@cross_origin()
@login_required
def get_conversations():

    try:
        result = db.engine.execute(text('SELECT * FROM "conversation" WHERE "conversation".user_a={} OR "conversation".user_b={}'.format(
            session['user'], session['user'])))
        conversations = []
        for i in list(result):
            index = i.user_b if i.user_a == session['user'] else i.user_a
            user = db.engine.execute(
                text('SELECT "user".username FROM "user" WHERE "user".id={}'.format(index))).first()
            
            conversations.append({'id': i.id, 'username': user[0]})

        return {'conversations': conversations}, 201
    except TypeError:
        return {'conversations': conversations}, 200
    except:
        return {'msg': 'Server Failure'}, 500


@dashboard.route("/search", methods=["GET"])
@cross_origin()
@login_required
def search_contact():
    query = request.args.get('query')
    if query == "":
        print(query == "")
        return redirect(url_for('dashboard.get_conversations'))
    try:
        result = db.engine.execute(text('SELECT "user".id AS id, "user".username AS username FROM "user" WHERE "user".username LIKE \'{}%\' AND "user".id!={};'.format(
            query, session['user'])))
        contacts = []
        for i in list(result):
            contacts.append({"id": i[0], "username": i[1]})
        return {'conversations': contacts}, 201
    except TypeError:
        return {'conversations': contacts}, 200
    except:
        return {'msg': 'Server Failure'}, 500


@dashboard.route("/conversations", methods=["POST"])
@cross_origin()
@login_required
def add_conversations():
    data = request.get_json(force=True)
    result = db.session.query(Conversation).from_statement(text(
        'SELECT * FROM "conversation" WHERE user_a={} AND user_b={} OR user_a={} AND user_b={};'.format(session['user'], data["recipient"], data["recipient"], session['user']))).first()

    if result is not None:
        return {'msg': 'Conversation already exists'}, 409

    try:
        conversation = Conversation(session['user'], data['recipient'])
        user = User.query.get(data['recipient'])
        db.session.add(conversation)
        db.session.commit()
        return {'conversation': {'id': conversation.id, 'username': user.username}}
    except:
        return {'msg': 'Server Failure'}, 500
    return {'msg': 'Added Conversation'}, 201


@dashboard.route("/conversations/<id>", methods=["DELETE"])
@login_required
def delete_conversation(id):
    try:
        conversation = Conversation.query.get(id)
        db.session.delete(conversation)
        db.session.commit()
    except UnmappedInstanceError:
        return {"msg": "Not a route"}, 404
    except:
        return {"msg": "Server Failure"}, 500
    return {"msg": "Deleted"}, 201
