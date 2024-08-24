import { useState } from "react";
import useModal from "../hooks/useModal";
import { Item } from "./ItemList";
import SellModal from "./modals/sellModal/SellModal";

interface OwnedItesProps {
  ownedItems: Item[];
}

const OrderedItemsList = ({ ownedItems }: OwnedItesProps) => {
  const [item, setItem] = useState<Item>();

  const modal = useModal();
  if (!ownedItems) {
    return null;
  }

  const handleSellingModal = (item: Item) => {
    setItem(item);
    modal.open();
  };

  return (
    <div className="col-4">
      <h2>Owned Items</h2>
      <p>Click on sell item to put an item back on the Market</p>
      <br />
      <div className="row">
        {ownedItems.map((ownedItem: Item) => (
          <div key={ownedItem.id} className="col-md-6">
            <div
              style={{ marginBottom: 5 }}
              className="card text-center bg-dark text-white"
            >
              <div className="card-body">
                <h5 className="card-title">{ownedItem.name}</h5>
                <button
                  type="button"
                  onClick={() => handleSellingModal(ownedItem)}
                  className="btn btn-outline-danger"
                  style={{ marginBottom: 5 }}
                >
                  Sell this Item
                </button>
                <p className="card-text">
                  <strong>This item costs {ownedItem.price}$</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SellModal modal={modal} item={item} />
    </div>
  );
};
export default OrderedItemsList;
