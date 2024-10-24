import { Form } from "react-router-dom";
import { useQty } from "../../../hooks/useQty";
import Counter from "../../counter/Counter";
import Modal from "../modal/Modal";
import { PurchaseModalProps } from "../purchaseModal/PurchaseModal";

const SellModal = ({ modal, item }: PurchaseModalProps) => {
  const qty = useQty({ value: 1, min: 1 });
  const handleClose = () => {
    modal.close();
  };

  return (
    <Modal {...modal} title={item?.name} denayText="Close">
      <Form method="POST" onSubmit={handleClose}>
        <h4 className="text-center">
          Are you sure you want to sell {item?.name} for {item?.price}$ ?
        </h4>
        <h6 className="text-center">
          By clicking Sell, you will put this item back on the Market
        </h6>
        <input name="id" type="hidden" value={item?.id} />
        <Counter min={1} id="qty" {...qty} />
        <button
          name="intent"
          value="sell"
          className="btn btn-outline-danger btn-block"
        >
          Sell
        </button>
      </Form>
    </Modal>
  );
};
export default SellModal;
