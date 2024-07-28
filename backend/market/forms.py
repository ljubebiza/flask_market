from flask import jsonify, request
from flask_restful import Resource
from flask_wtf import FlaskForm
from werkzeug.exceptions import BadRequest
from wtforms import PasswordField, StringField, SubmitField
from wtforms.validators import DataRequired

from market import db
from market.models import User


class RegisterResource(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        password_confirmation = data.get("password_confirmation")

        # Basic input validation
        if not username or not email or not password or not password_confirmation:
            return jsonify({"error": "Missing required fields"}), 400

        if password != password_confirmation:
            return jsonify({"error": "Passwords do not match"}), 400

        # Username and email validation
        user = User.query.filter_by(username=username).first()
        if user:
            return jsonify({"error": "Username already exists"}), 400

        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"error": "Email address already exists"}), 400

        # Create user (assuming a create_user function)
        def create_user(username, email, password):
            new_user = User(
                username=username,
                email_address=email,
                password=password,
            )
            db.session.add(new_user)
            db.session.commit()

        try:
            create_user(username, email, password)
            return jsonify({"message": "User created successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])


class BuyItemForm(FlaskForm):
    submit = SubmitField(label="Buy Item")


class SellItemForm(FlaskForm):
    submit = SubmitField(label="Sell Item")
