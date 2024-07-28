import { useState, useCallback } from "react";

type UseModalOptions = {
  onOpen?: () => void;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
};

const useModal = ({
  onOpen,
  onClose,
  closeOnBackdropClick = true,
}: UseModalOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    if (onOpen) onOpen();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) {
      close();
    }
  }, [closeOnBackdropClick, close]);

  return {
    isOpen,
    open,
    close,
    handleBackdropClick,
  };
};

export default useModal;
