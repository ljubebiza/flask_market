# from flask import Flask
# from market.extensions import bcrypt, cors, db, login_manager
#
#
# def create_app(config_filename=None):
#     app = Flask(__name__)
#     cors.init_app(app, resources={r"/*": {"origins": "http://localhost:3000"}})
#
#     app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///market.db"
#     app.config["SECRET_KEY"] = "f879e9233bb5eabe35c3dab8"
#
#     db.init_app(app)
#     bcrypt.init_app(app)
#     login_manager.init_app(app)
#     # login_manager.login_view = "routes.login_page"
#     login_manager.login_message_category = "info"
#
#     with app.app_context():
#         from . import models  # Import models here
#
#         @app.before_first_request
#         def create_tables():
#             db.create_all()
#
#     from market.api import api_blueprint
#     from market.routes import routes  # Import routes blueprint
#
#     app.register_blueprint(api_blueprint)
#     app.register_blueprint(routes)
#
#     return app
#
# TODO: Make create_app method and relay on extentios.py
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from market.extensions import login_manager

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///market.db"
app.config["SECRET_KEY"] = "f879e9233bb5eabe35c3dab8"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
# login_manager.init_app(app)


# @login_manager.unauthorized_handler
# def unauthorized():
#     return jsonify({"message": "User not logged in"}), 401


CORS(
    app,
    # resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True,
)
from market.api import api_blueprint
from market.routes import routes  # Import routes blueprint

app.register_blueprint(api_blueprint)
app.register_blueprint(routes)

# def create_random_items():
#     from market.models import Item
#
#     # Check if there are any items in the database
#     if Item.query.count() == 0:
#         items = []
#         for i in range(5):
#             item = Item(
#                 name=f"Item-{i + 1}",
#                 price=random.randint(10, 100),
#                 barcode=f"{random.randint(100000000000, 999999999999)}",
#                 description=f"Description for Item-{i + 1}",
#             )
#             items.append(item)
#
#         # Add items to the session and commit to the database
#         db.session.add_all(items)
#         db.session.commit()
#
#         print("Added 5 random items to the database.")
#
#
# # Ensure the database tables are created and populated with initial data
# with app.app_context():
#     db.create_all()
#     create_random_items()
