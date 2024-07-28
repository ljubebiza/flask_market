# from flask import Blueprint
# from flask_restful import Api
# market/api/blueprint.py
from flask import Blueprint
from market.api.authentication import LoginResource, RegisterUserResource
from market.api.market_resource import MarketResource

api = Blueprint("api", __name__, template_folder="templates")

# from market.api.authentication import RegisterUserResource


# Register resources
def register_routes_for_resources(api_blueprint, route, methods, name_slug, resource):
    for method in methods:
        name = f"api_{method}_{name_slug}"
        api_blueprint.add_url_rule(
            route, methods=[method], view_func=resource.as_view(name)
        )


resources = [
    ["/register", ["POST"], "register_user", RegisterUserResource],
    ["/login", ["POST"], "login_user", LoginResource],
    ["/market", ["POST"], "purcahse_item", MarketResource],
    ["/market", ["GET"], "get_purchased_items", MarketResource],
]

for api_resource in resources:
    register_routes_for_resources(api, *api_resource)
