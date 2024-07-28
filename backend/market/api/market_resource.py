from flask import flash, g, jsonify, redirect, request, url_for
from flask_login import current_user
from flask_restful import Resource
from market.api_utils.api_token_helper import token_required
from market.models import Item


class MarketResource(Resource):
    @token_required
    def get(self):
        items = Item.query.filter_by(owner=None).all()
        owned_items = Item.query.filter_by(owner=g.user_id).all()

        items_data = [
            item.to_dict() for item in items
        ]  # Assuming you have a to_dict method in your Item model
        owned_items_data = [item.to_dict() for item in owned_items]

        response = {
            "owned_items": owned_items_data,
            "status": "success",
            "data": {"message": "Request was successful", "items": items_data},
        }
        return jsonify(response), 200

    @token_required
    #  TODO: items purchaseing and selling
    def post(self):
        # purchase item logic
        purchased_item = request.form.get("purchased_item")
        p_item_object = Item.query.filter_by(name=purchased_item).first()
        if p_item_object:
            if current_user.can_purchase(p_item_object):
                p_item_object.buy(current_user)
                flash(
                    f"Congratulations! You have purchased {p_item_object.name} for {p_item_object.price}$",
                    category="success",
                )
            else:
                flash(
                    f"Unfortunately, you do not have enough money to purchase {p_item_object.name}",
                    category="danger",
                )
        # selling item logic
        sold_item = request.form.get("sold_item")
        s_item_object = Item.query.filter_by(name=sold_item).first()
        if s_item_object:
            if current_user.can_sell(s_item_object):
                s_item_object.sell(current_user)
                flash(
                    f"Congratulations! You have sold {s_item_object.name} back to Market!",
                    category="success",
                )
            else:
                flash(
                    f"Something went wrong with selling {s_item_object.name}",
                    category="danger",
                )
        return redirect(url_for("market_page"))
