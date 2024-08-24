from flask import jsonify, request
from flask_restful import Resource

from market import db
from market.api_utils.api_token_helper import token_required
from market.models import Item, Purchase, User


class MarketResource(Resource):
    @token_required
    def get(self, current_user):
        items = Item.query.all()
        owned_items = db.session.query(Item).join(Purchase).filter(Purchase.user_id == current_user["user_id"]).all()
        owned_items = (
            db.session.query(Item, Purchase.quantity)
            .join(Purchase)
            .filter(Purchase.user_id == current_user["user_id"])
            .all()
        )

        items_data = [item.to_dict() for item in items]  # Assuming you have a to_dict method in your Item model

        owned_items_data = []

        for item, quantity in owned_items:
            owned_item_dict = {
                "id": item.id,
                "name": item.name,
                "price": item.price,
                "description": item.description,
                "barcode": item.barcode,
                "quantity": quantity,  # The quantity purchased by the user
            }

            owned_items_data.append(owned_item_dict)

        response = {
            "status": "success",
            "data": {
                "message": "Request was successful",
                "items": items_data,
                "owned_items": owned_items_data,
            },
        }
        return jsonify(response), 200

    @token_required
    def post(self, current_user):
        if not request.is_json:
            return (
                jsonify({"error": "Invalid content type, must be application/json"}),
                400,
            )

        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "Request body must contain JSON data"}), 400

        # purchase item logic
        p_item_id = request_data.get("id")
        quantity = int(request_data.get("quantity"))

        item_object = Item.query.filter_by(id=p_item_id).first()
        current_user_data = User.query.filter_by(id=current_user["user_id"]).first()

        if item_object and quantity:
            if current_user_data.can_purchase(item_object, quantity):
                print("Purchased")
                item_object.buy(current_user_data, quantity)
                return (
                    jsonify(
                        {
                            "message": f"Congratulations! You have purchased {item_object.name} for {item_object.price}$",
                            "status": "success",
                        }
                    ),
                    200,
                )

            return (
                jsonify(
                    {
                        "message": f"Unfortunately, you do not have enough money to purchase {item_object.name}",
                        "error": "insufcent funds",
                    }
                ),
                403,
            )
        return jsonify({"message": "Mssing purchase data"}), 403


class SellItemResource(Resource):
    @token_required
    def post(self, current_user):
        if not request.is_json:
            return (
                jsonify({"error": "Invalid content type, must be application/json"}),
                400,
            )

        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "Request body must contain JSON data"}), 400

        # purchase item logic
        p_item_id = request_data.get("id")
        quantity = int(request_data.get("quantity"))

        user_id = current_user["user_id"]

        purchased_item = Purchase.query.filter_by(
            user_id=user_id,
            item_id=p_item_id,
        ).first()
        item_object = Item.query.filter_by(id=p_item_id).first()
        current_user_data = User.query.filter_by(id=user_id).first()

        # selling item logic
        if purchased_item and item_object:
            if current_user_data.can_sell(purchased_item, quantity):
                item_object.sell(current_user_data, purchased_item, quantity)
                return (
                    jsonify(
                        {
                            "message": f"Congratulations! You have sold {item_object.name} back to Market!",
                            "status": "success",
                        }
                    ),
                    200,
                )

            return jsonify({"error": f"Something went wrong with selling {item_object.name}"})
