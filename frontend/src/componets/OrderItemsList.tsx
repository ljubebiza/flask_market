interface OwnedItem {
  id: number;
  name: string;
  price: number;
}

interface OwnedItesProps {
  ownedItems?: OwnedItem[];
}

const OrderedItemsList = ({ ownedItems }: OwnedItesProps) => {
  if (!ownedItems) {
    return null;
  }
  return (
    <div className="col-4">
      <h2>Owned Items</h2>
      <p>Click on sell item to put an item back on the Market</p>
      <br />
      <div className="row">
        {ownedItems.map((ownedItem: OwnedItem) => (
          <div key={ownedItem.id} className="col-md-6">
            <div
              style={{ marginBottom: 5 }}
              className="card text-center bg-dark"
            >
              <div className="card-body">
                <h5 className="card-title">{ownedItem.name}</h5>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  style={{ marginBottom: 5 }}
                  data-toggle={`#Modal-SellingConfirm-${ownedItem.id}`}
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
    </div>
  );
};
export default OrderedItemsList;
