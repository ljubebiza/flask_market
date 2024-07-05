import React from "react";

// Define interfaces for props
interface Item {
  id: number;
  name: string;
  barcode: string;
  price: number;
}

interface OwnedItem {
  id: number;
  name: string;
  price: number;
}

// Define props interface for MarketPage component
interface MarketPageProps {
  items: Item[];
  ownedItems?: OwnedItem[];
}

// MarketPage component
const ItemList: React.FC<MarketPageProps> = ({ items, ownedItems }) => {
  return (
    <div className="row" style={{ marginTop: 20, marginLeft: 20 }}>
      <div className="col-8">
        <h2>Available items on the Market</h2>
        <p>Click on one of the items to start buying</p>
        <br />
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Barcode</th>
              <th scope="col">Price</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {items.length &&
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.barcode}</td>
                  <td>{item.price}$</td>
                  <td>
                    <button
                      className="btn btn-outline btn-info"
                      data-toggle="modal"
                      data-target={`#Modal-MoreInfo-${item.id}`}
                    >
                      More Info
                    </button>
                    <button
                      className="btn btn-outline btn-success"
                      data-toggle="modal"
                      data-target={`#Modal-PurchaseConfirm-${item.id}`}
                    >
                      Purchase this Item
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {ownedItems && (
        <div className="col-4">
          <h2>Owned Items</h2>
          <p>Click on sell item to put an item back on the Market</p>
          <br />
          <div className="row">
            {ownedItems?.length &&
              ownedItems.map((ownedItem) => (
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
      )}
    </div>
  );
};

export default ItemList;
