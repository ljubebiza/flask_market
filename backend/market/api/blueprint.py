from flask import Blueprint

from market.api.authentication import LoginResource, RegisterUserResource
from market.api.logout_resource import LogoutResource
from market.api.market_resource import MarketResource, SellItemResource

api = Blueprint("api", __name__, template_folder="templates")


# Register resources
def register_routes_for_resources(api_blueprint, route, methods, name_slug, resource):
    for method in methods:
        name = f"api_{method}_{name_slug}"
        api_blueprint.add_url_rule(route, methods=[method], view_func=resource.as_view(name))


resources = [
    ["/register", ["POST"], "register_user", RegisterUserResource],
    ["/login", ["POST"], "login_user", LoginResource],
    ["/market/purchase", ["POST"], "purcahse_item", MarketResource],
    ["/market", ["GET"], "get_purchased_items", MarketResource],
    ["/logout", ["POST"], "logout_user", LogoutResource],
    ["/market/sell", ["POST"], "sell_item", SellItemResource],
]

for api_resource in resources:
    register_routes_for_resources(api, *api_resource)
