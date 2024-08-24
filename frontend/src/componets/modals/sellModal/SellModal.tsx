import { useFetcher } from "react-router-dom";
import Modal from "../modal/Modal";
import { PurchaseModalProps } from "../purchaseModal/PurchaseModal";

const SellModal = ({ modal, item }: PurchaseModalProps) => {
  const fetcher = useFetcher();

  const handleSell = () => {
    item &&
      fetcher.submit(
        { id: item.id, quantity: 1, intent: "sell" },
        { method: "POST" },
      );
  };
  return (
    <Modal {...modal} title={item?.name} denayText="Close">
      <h4 className="text-center">
        Are you sure you want to sell {item?.name} for {item?.price}$ ?
      </h4>
      <h6 className="text-center">
        By clicking Sell, you will put this item back on the Market
      </h6>
      <input
        id="sold_item"
        name="sold_item"
        type="hidden"
        value="{{owned_item.name}}"
      />
      <button
        name="sell"
        className="btn btn-outline-danger btn-block"
        onClick={handleSell}
      >
        Sell
      </button>
    </Modal>
  );
};
export default SellModal;
