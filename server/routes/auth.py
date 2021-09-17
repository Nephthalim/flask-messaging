from flask import Flask, request, jsonify, Blueprint, session
import bcrypt
from server.models.user import User
from server import db, login_required
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_cors import cross_origin


auth = Blueprint('auth', __name__)

@auth.route("/login", methods=["POST"])
@cross_origin()
def login_user():
    data = request.get_json(force=True)
    username = data["username"]
    password = data["password"]

    if username is None or password is None:
        return {"msg": "Missing data"}, 422

    user = User.query.filter(User.username == username).first()

    if not user:
        return {"msg": "User does not exist"}, 401
    if not bcrypt.checkpw(password.encode('utf-8'), user.password):
        return {'msg': "Incorrect password"}, 401
    access_token = create_access_token(identity=user.id)

    return jsonify({"access_token": access_token}), 201

@auth.route("/register", methods=["POST", "OPTIONS"])
@cross_origin()
def register_user():
    data = request.get_json(force=True)
    username = data["username"]
    password = data["password"]
    if username is None or password is None:
        return {'msg': "Missing data"}, 422

    if User.query.filter_by(username=username).count() == 1:
        return {'msg': "User already exists"}, 401
    print(password)
    hashedpwd = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    print(hashedpwd)
    user = User(username=username, password=hashedpwd)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.id)

    msg = {"access_token": access_token}
    return jsonify(msg), 201

@auth.route('/logout', methods=["POST", "OPTIONS"])
@cross_origin()
@login_required
def logout():
    session['user'] = None
    print(session['user'])
    return {"msg":"logout"}, 200
