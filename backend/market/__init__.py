# import random

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///market.db"
app.config["SECRET_KEY"] = "f879e9233bb5eabe35c3dab8"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category = "info"
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

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
#
from market import routes
