import os

from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
bcrypt = Bcrypt()
migrate = Migrate()
load_dotenv()


def create_app(debug=True):

    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///market.db"
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    allowed_origins = ["http://localhost:3001", "http://localhost:3000"]

    CORS(
        app,
        resources={r"/*": {"origins": allowed_origins}},
        supports_credentials=True,
    )
    from market.api import api_blueprint
    from market.routes import routes  # Import routes blueprint

    app.register_blueprint(api_blueprint)
    app.register_blueprint(routes)

    return app


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
