import Modal, { ModalProps } from "../modal/Modal";
type MoreInfoModalProps = {
  title: string;
  description: string;
  modal: Omit<ModalProps, "children">;
};
export const MoreInfoModal = ({
  title,
  description,
  modal,
}: MoreInfoModalProps) => {
  return (
    <Modal {...modal} title={title} denayText="Close">
      <p>{description}</p>
    </Modal>
  );
};
