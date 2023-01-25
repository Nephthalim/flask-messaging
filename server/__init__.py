from flask import Flask, render_template, request, redirect, url_for, session, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, verify_jwt_in_request, decode_token


app = Flask(__name__)

db = SQLAlchemy()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # print(request.headers)
        if not 'x-token' in request.headers:
            abort(403)
        token = request.headers.get('x-token')
        user_id = None
        try:
            user_id = decode_token(token, allow_expired=True)['sub']
        except:
            abort(401)
        session['user'] = user_id       
        return f(*args, **kwargs)
    return decorated_function


def create_app():
    """
    db = railway
    host = containers-us-west-180.railway.app
    password = 8xxSdBWrv1z4GWrifwFP
    port = 7432
    user = postgres
    postgresql://postgres:8xxSdBWrv1z4GWrifwFP@ontainers-us-west-180.railway.app:7432/railway
    """
    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = 'asdfasdfasdf'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:8xxSdBWrv1z4GWrifwFP@containers-us-west-180.railway.app:7432/railway"
    app.config['JWT_SECRET_KEY'] = 'DFRHAPEDsdhgpdr8werdf'
    app.config['JWT_HEADER_NAME'] = 'x-token'
    app.config['JWT_HEADER_TYPE'] = ''
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['CORS_ALLOW_HEADERS'] = ['*']
    
    cors = CORS(app,resources={r"/*":{"Access-Control-Allow-Origin":"*"}})
    jwt = JWTManager(app)

    from server.routes.auth import auth
    from server.routes.dashboard import dashboard
    from server.routes.chat import chat

    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(dashboard, url_prefix='/dashboard')
    app.register_blueprint(chat, url_prefix='/chat')


    db.init_app(app)

    with app.app_context():
        db.create_all()
    return app
