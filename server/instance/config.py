# import pdfkit;


class Config:
    CSRF_ENABLED = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'ASDFASDFSADASDFSSDF7788SDF8S7DF8SDFSDF8FAF'
    FLASK_ADMIN_SWATCH = 'cosmo'

    # options = {'enable-local-file-access': None}
    # pdfkit.from_string(html_string, "filename.pdf", options=options)

    SQLALCHEMY_DATABASE_URI = 'postgresql://relaydev:relay8520@relaydev2.ccgstxys4phm.us-east-1.rds.amazonaws.com/relaydb'  # develop
    # SQLALCHEMY_DATABASE_URI = 'postgresql://relayadmin:relay1234@relaymiledb.ccgstxys4phm.us-east-1.rds.amazonaws.com/relaymiledb'  # master
    # SQLALCHEMY_DATABASE_URI = 'postgresql://relaymileadmin:JpZ2txgyn@relaymiledb.cokdpxkhq9b7.us-east-2.rds.amazonaws.com/relaymile_database'

    WKHTMLTOPDF_PATH = 'E:\\relaymile_work\\wkhtmltopdf\\bin\\wkhtmltopdf.exe'

    # Mac and Linux users
    WKHTMLTOPDF_PATH = 'C:\\Users\\maxus\\Documents\\GitHub\\relayMile_Flask\\wkhtmltopdf\\bin\\wkhtmltopdf.exe'
    # Windows users

    SECURITY_PASSWORD_SALT = 'aslkfj909'
    SECURITY_PASSWORD_HASH = 'sha512_crypt'
    UPLOAD_FOLDER = './documents'
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024
    JSONIFY_MIMETYPE = "application/json"
    JSONIFY_PRETTYPRINT_REGULAR = False
    # Flask-Mail SMTP server settings
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    MAIL_USERNAME = 'info@relaymile.com'
    MAIL_PASSWORD = 'password'
    MAIL_DEFAULT_SENDER = '"Relaymile" <noreply@relaymile.com>'

    # Flask-User settings
    USER_APP_NAME = "Relaymile"  # Shown in and email templates and page footers
    USER_ENABLE_EMAIL = True  # Enable email authentication
    USER_ENABLE_USERNAME = False  # Disable username authentication
    USER_EMAIL_SENDER_NAME = USER_APP_NAME
    USER_EMAIL_SENDER_EMAIL = "info@relaymile.com"
    # AWS SES configuration
    # This address must be verified with Amazon SES
    AWS_SENDER = 'admin@relaymile.com'
    BASE_URL = 'http://localhost:5000'


class DevelopmentConfig(Config):
    """Configurations for Development."""
    DEBUG = True
    # SQLALCHEMY_DATABASE_URI = 'postgresql://relaydev:relay8520@relaydev2.ccgstxys4phm.us-east-1.rds.amazonaws.com/relaydb'
    SQLALCHEMY_DATABASE_URI = 'postgresql://relaydev:relay8520@relaydev2.ccgstxys4phm.us-east-1.rds.amazonaws.com/relaydb'  # develop
    # SQLALCHEMY_DATABASE_URI = "postgresql://postgres:P@ssw0rd1412@localhost/relaymile_local"  # Firdavs local test db
    TWILIO_AUTH_TOKEN = "290551efd0a19f95025574ceebbe81c7"
    TWIML_APP_SID = "APce3a3ff67844ed601a4249d913c6ad0d"
    TWILIO_API_KEY_SID = "SKa6028d3221f22e4ad404ed72883148c7"
    TWILIO_API_KEY_SECRET = "lUueOVBCtDvDoW3r1mHPr0ZlDe1uajT2"
    TWILIO_ACCOUNT_SID = "AC0f26bf6683b9f30e192b3045f9ec2ea7"


class TestingConfig(Config):
    """Configurations for Testing, with a separate test database."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5430/relaydb'
    DEBUG = True
    SECRET_KEY = 'lalaalalalala'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "postgresql://czxagpbyvqgixj:be1592fba4bacb85888fa58cf9a692afdb66f1c8358f27110f2cbd49ef5c7e51@ec2-54-211-176-156.compute-1.amazonaws.com:5432/de1p4tutb4tt2j"
    JWT_SECRET_KEY = 'DFRHAPEDsdhgpdr8werdf'


class ProductionConfig(Config):
    """Configurations for Production."""
    # master db
    SQLALCHEMY_DATABASE_URI = 'postgresql://relayadmin:relay1234@relaymiledb.ccgstxys4phm.us-east-1.rds.amazonaws.com/relaymiledb'
    DEBUG = False
    TESTING = False
    TWILIO_AUTH_TOKEN = "290551efd0a19f95025574ceebbe81c7"
    TWIML_APP_SID = "APce3a3ff67844ed601a4249d913c6ad0d"
    TWILIO_API_KEY_SID = "SKa6028d3221f22e4ad404ed72883148c7"
    TWILIO_API_KEY_SECRET = "lUueOVBCtDvDoW3r1mHPr0ZlDe1uajT2"
    TWILIO_ACCOUNT_SID = "AC0f26bf6683b9f30e192b3045f9ec2ea7"


app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
}
