from flask import jsonify, session
from flask_restful import Resource

from market.api_utils.api_token_helper import token_required


class LogoutResource(Resource):
    @token_required
    def post(self, current_user):
        session.pop("logged_in", None)
        session.pop("user_id", None)

        return jsonify({"message": "Logged out successfully"}), 200
