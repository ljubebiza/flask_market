import { useFetcher } from "react-router-dom";
import { Item } from "../../ItemList";
import Modal, { ModalProps } from "../modal/Modal";

export interface PurchaseModalProps {
  modal: Omit<ModalProps, "children">;
  item?: Item;
}

const PurchaseModal = ({ modal, item }: PurchaseModalProps) => {
  const fetcher = useFetcher();

  const handlePurchase = () => {
    item &&
      fetcher.submit(
        { id: item.id, quantity: 1, intent: "purchase" },
        { method: "POST" },
      );
  };

  return (
    <Modal {...modal} title={item?.name} denayText="Close">
      <div>
        <h4 className="text-center">
          {`Are you sure you want to buy ${item?.name} for ${item?.price}$ ?`}
        </h4>
        <h6 className="text-center">
          By clicking Purchase, you will purchase this item.
        </h6>
        <button
          className="btn btn-outline-success btn-block"
          onClick={handlePurchase}
          name="purchase"
        >
          Buy Item
        </button>
      </div>
    </Modal>
  );
};
export default PurchaseModal;
