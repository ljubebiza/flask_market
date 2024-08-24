# routes.py
from flask import Blueprint, jsonify

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
