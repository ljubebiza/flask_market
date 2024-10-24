import { Form } from "react-router-dom";
import { useQty } from "../../../hooks/useQty";
import Counter from "../../counter/Counter";
import { Item } from "../../ItemList";
import Modal, { ModalProps } from "../modal/Modal";

export interface PurchaseModalProps {
  modal: Omit<ModalProps, "children">;
  item?: Item;
}

const PurchaseModal = ({ modal, item }: PurchaseModalProps) => {
  const qty = useQty({ value: 1, min: 1 });

  const handleClose = () => {
    modal.close();
  };

  return (
    <Modal {...modal} title={item?.name} denayText="Close">
      <Form method="POST" onSubmit={handleClose}>
        <h4 className="text-center">
          {`Are you sure you want to buy ${item?.name} for ${item?.price}$ ?`}
        </h4>
        <h6 className="text-center">
          By clicking Purchase, you will purchase this item.
        </h6>
        <input name="id" type="hidden" value={item?.id} />
        <Counter min={1} {...qty} />
        <button
          className="btn btn-outline-success btn-block"
          name="intent"
          value="buy"
        >
          Buy Item
        </button>
      </Form>
    </Modal>
  );
};
export default PurchaseModal;
