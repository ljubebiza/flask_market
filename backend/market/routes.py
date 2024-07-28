# routes.py
from flask import Blueprint, g, jsonify, request, session

from market.api_utils.api_token_helper import token_required
from market.models import Item

routes = Blueprint("routes", __name__)


@routes.route("/")
@routes.route("/home")
def home_page():
    items = Item.query.filter_by(owner=None).all()
    items_data = [
        {
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "barcode": item.barcode,
            "description": item.description,
        }
        for item in items
    ]
    response = {
        "status": "success",
        "data": {"message": "Request was successful", "items": items_data},
    }
    return jsonify(response), 200


@routes.route("/logout", methods=["GET", "POST"])
@token_required
def logout():
    session.pop("logged_in", None)
    token = request.headers.get("Authorization").split()[1]  # Assuming 'Bearer <JWT>'
    g.blacklisted_tokens.add(token)

    return jsonify({"message": "Logged out successfully"}), 200
