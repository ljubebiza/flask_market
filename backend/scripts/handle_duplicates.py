import time

from sqlalchemy import func

from market import db  # Replace with your actual import path
from market.models import Purchase  # Replace with your actual import path


def consolidate_purchases():
    with db.session.no_autoflush:
        # Query all purchases grouped by user_id and item_id, summing the quantities
        grouped_purchases = (
            db.session.query(Purchase.user_id, Purchase.item_id, func.sum(Purchase.quantity).label("total_quantity"))
            .group_by(Purchase.user_id, Purchase.item_id)
            .all()
        )

        # Iterate through each grouped result
        for user_id, item_id, total_quantity in grouped_purchases:
            # Get all the purchases for this user_id and item_id
            purchases = Purchase.query.filter_by(user_id=user_id, item_id=item_id).all()

            # Keep the first purchase and update its quantity
            first_purchase = purchases[0]
            first_purchase.quantity = total_quantity

            # Delete the remaining duplicates
            for duplicate in purchases[1:]:
                db.session.delete(db.session.merge(duplicate))  # Ensure it's attached to the current session
                db.session.commit()  # Commit after each deletion
                time.sleep(0.1)  # Slight delay between deletions

        # Commit the changes
        db.session.commit()
