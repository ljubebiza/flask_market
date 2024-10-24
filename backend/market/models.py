from sqlalchemy.inspection import inspect

from market.extensions import bcrypt, db


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=30), nullable=False, unique=True)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    budget = db.Column(db.Integer(), nullable=False, default=1000)
    purchases = db.relationship("Purchase", backref="user", lazy=True)

    @property
    def prettier_budget(self):
        if len(str(self.budget)) >= 4:
            return f"{str(self.budget)[:-3]},{str(self.budget)[-3:]}$"
        return f"{self.budget}$"

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(plain_text_password).decode("utf-8")

    def check_password_correction(self, attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)

    def can_purchase(self, item_obj, quantity: int):
        print(f"Price: {item_obj.price} Quantity: {quantity}")
        return self.budget >= item_obj.price * quantity

    def can_sell(self, item_obj, quantity):
        return item_obj.quantity >= quantity

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


class Item(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(length=30), nullable=False, unique=True)
    price = db.Column(db.Integer(), nullable=False)
    barcode = db.Column(db.String(length=12), nullable=False, unique=True)
    description = db.Column(db.String(length=1024), nullable=False, unique=True)
    quantity = db.Column(db.Integer(), nullable=False, default=1)

    def __repr__(self):
        return f"Item {self.name}"

    def buy(self, user, existing_purchase, quantity):

        if existing_purchase:
            existing_purchase.quantity += quantity
        else:
            # Create a new purchase
            new_purchase = Purchase(user_id=user.id, item_id=self.id, quantity=quantity)
            db.session.add(new_purchase)

        user.budget -= self.price * quantity
        db.session.commit()

    def sell(self, user, purchase_item, quantity):
        user.budget += self.price * quantity
        purchase_item.quantity = purchase_item.quantity - quantity

        if purchase_item.quantity == 0:
            db.session.delete(purchase_item)
        else:
            db.session.add(purchase_item)

        db.session.commit()

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "barcode": self.barcode,
            "quantity": self.quantity,
        }

    def __str__(self):
        return f"'id':{self.id}, 'name': {self.name}, 'price': {self.price}, 'description': {self.description}, 'barcode': {self.barcode}, 'quantity': {self.quantity}"


class Purchase(db.Model):
    __tablename__ = "purchases"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("item.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    def as_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
