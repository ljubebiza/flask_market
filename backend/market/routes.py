from crypt import methods

from flask import flash, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user
from market import app, db
from market.forms import BuyItemForm, LoginForm, RegisterForm, SellItemForm
from market.models import Item, User


@app.route("/")
@app.route("/home")
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
    data = {
        "status": "success",
        "data": {"message": "Request was successful", "items": items_data},
    }
    return jsonify(data), 200

    # return render_template("home.html")


@app.route("/market", methods=["GET", "POST"])
@login_required
def market_page():
    buy_form = BuyItemForm()
    selling_form = SellItemForm()
    if request.method == "POST":
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
                    f"Congratulations! You have sold {p_item_object.name} back to Market!",
                    category="success",
                )
            else:
                flash(
                    f"Something went wrong with selling {p_item_object.name}",
                    category="danger",
                )
        return redirect(url_for("market_page"))

    elif request.method == "GET":
        items = Item.query.filter_by(owner=None)
        owned_items = Item.query.filter_by(owner=current_user.id)

        return render_template(
            "market.html",
            items=items,
            buy_form=buy_form,
            owned_items=owned_items,
            selling_form=selling_form,
        )


@app.route("/register", methods=["GET", "POST"])
def register_page():
    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = User(
            username=form.username.data,
            email_address=form.email_address.data,
            password=form.password1.data,
        )
        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(
            f"Account created successfully! You are now logged in as {user_to_create.username}",
            category="success",
        )
        return redirect(url_for("market_page"))
    if form.errors != {}:  # if there are no errors from the validations
        for err_msg in form.errors.values():
            flash(
                f"There was an error with creating a User: {err_msg}", category="danger"
            )
    return render_template("register.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        attemped_user = User.query.filter_by(username=form.username.data).first()
        if attemped_user and attemped_user.check_password_correction(
            attempted_password=form.password.data
        ):
            login_user(attemped_user)
            flash(
                f"Success! You are logged in as: {attemped_user.username}",
                category="success",
            )
            return redirect(url_for("market_page"))
        else:
            flash(
                "Username and password do not match. Please try agan.",
                category="danger",
            )

    return render_template("login.html", form=form)


@app.route("/logout", methods=["GET", "POST"])
def logout_page():
    logout_user()
    flash("You have been loged out!", category="info")
    return redirect(url_for("home_page"))

