from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import current_app as app
from flask import g, jsonify, request, session


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Token is missing!"}), 401

        token = auth_header.split()[1]

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

            g.user_id = data["user_id"]
            g.blacklisted_tokens = set()

            if token in g.blacklisted_tokens:
                return jsonify({"message": "Token has been blacklisted!"}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401

        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 403

        return func(*args, **kwargs)

    return decorated


def login_user_jwt(id):
    session["logged_in"] = True
    token = jwt.encode(
        {
            "user_id": id,
            "expiration": str(datetime.utcnow() + timedelta(minutes=1240)),
        },
        app.config["SECRET_KEY"],
        algorithm="HS256",
    )
    return token
