import { ReactNode, useId } from "react";

export interface ModalProps {
  title?: string;
  children?: ReactNode;
  confirmText?: string;
  denayText?: string;
  onConfirm?: () => void;
  onDenay?: () => void;
  isOpen: boolean;
  handleBackdropClick: () => void;
  close: () => void;
}

const Modal = ({
  title,
  children,
  confirmText,
  denayText,
  onConfirm,
  onDenay,
  isOpen,
  handleBackdropClick,
  close,
}: ModalProps) => {
  const id = useId();
  const hasFooter = confirmText || denayText;

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      id={`modal-${id}`}
      aria-labelledby="baseModal"
      aria-hidden={!isOpen}
      tabIndex={-1}
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={close}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          {hasFooter && (
            <div className="modal-footer">
              {denayText && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={onDenay || close}
                >
                  {denayText}
                </button>
              )}
              {confirmText && (
                <button className="btn btn-primary" onClick={onConfirm}>
                  {confirmText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
