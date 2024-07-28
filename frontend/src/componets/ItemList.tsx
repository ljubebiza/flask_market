import React, { useState } from "react";
import useModal from "../hooks/useModal";
import { MoreInfoModal } from "./modals/infoModal/MoreInfoModal";

// Define interfaces for props
export interface Item {
  id: number;
  name: string;
  barcode: string;
  price: number;
  description?: string;
}

interface MarketPageProps {
  items?: Item[];
}

// MarketPage component
const ItemList: React.FC<MarketPageProps> = ({ items }) => {
  const modal = useModal();
  const [item, setItem] = useState<Item | null>();

  const handleDescription = (item: Item) => {
    setItem(item);
    modal.open();
  };
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
            {items?.length
              ? items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.barcode}</td>
                    <td>{item.price}$</td>
                    <td>
                      <button
                        className="btn btn-outline btn-info"
                        data-toggle="modal"
                        onClick={() => handleDescription(item)}
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
                ))
              : null}
          </tbody>
        </table>
        <MoreInfoModal
          modal={modal}
          title={item?.name || ""}
          description={item?.description || ""}
        />
      </div>
    </div>
  );
};

export default ItemList;
