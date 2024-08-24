from functools import wraps

import jwt
from flask import current_app as app
from flask import jsonify, request, session


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Token is missing!", "error": "Unauthorized"}), 401

        token = auth_header.split()[1]

        try:
            current_user = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except Exception as error:
            return jsonify({"message": "Invalid token!", "error": str(error)}), 403

        return func(current_user=current_user, *args, **kwargs)

    return decorated


def login_user_jwt(user_id):

    try:
        token = jwt.encode({"user_id": user_id}, app.config["SECRET_KEY"], algorithm="HS256")
        session["user_id"] = user_id
        session["logged_in"] = True
    except Exception as e:
        return {"error": "Something went wrong", "message": str(e)}, 500

    return token
