from typing import Any, Dict, Optional

from flask import jsonify, request
from flask_restful import Resource

from market.api_utils.api_token_helper import login_user_jwt
from market.extensions import db
from market.models import User


class RegisterUserResource(Resource):
    def post(self):
        data: Optional[Dict[str, Any]] = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        username: Optional[str] = data.get("username")
        email: Optional[str] = data.get("email")
        password: Optional[str] = data.get("password")
        password_confirmation: Optional[str] = data.get("password_confirmation")

        # Basic input validation
        if not username or not email or not password or not password_confirmation:
            return jsonify({"error": "Missing required fields"}), 400

        if password != password_confirmation:
            return jsonify({"error": "Passwords do not match"}), 400

        # Username and email validation
        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        if User.query.filter_by(email_address=email).first():
            return jsonify({"error": "Email address already exists"}), 400

        def create_user(username: str, email: str, password: str):
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


class LoginResource(Resource):
    def post(self):
        """
        Handle user login.

        This endpoint expects a JSON body with 'username' and 'password' fields.
        It validates the user's credentials and returns an appropriate response.

        Returns:
            JSON response with a success message, or an error message with the appropriate
            HTTP status code.
        """
        if not request.is_json:
            return (
                jsonify(
                    {
                        "message": "Invalid content type, must be application/json",
                        "error": "Bad request",
                    }
                ),
                400,
            )

        login_data = request.json
        if not login_data:
            return jsonify({"message": "Request body must contain JSON data", "error": "Bad request"}), 400

        username = login_data.get("username")
        password = login_data.get("password")

        if not username or not password:
            return (
                jsonify(
                    {
                        "message": "Username and password are required",
                        "error": "Bad request",
                    }
                ),
                400,
            )

        # Check if the username exists in the database
        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password_correction(password):
            return (
                jsonify({"message": "Wrong username or password", "error": "Unauthorized"}),
                401,
            )

        token = login_user_jwt(user.id)
        user_d = user.as_dict()
        print(f"User: {user}")

        return jsonify({"token": token, "user": {"balance": user_d["budget"], "username": user_d["username"]}}), 200
