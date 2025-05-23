import { useEffect, useState } from 'react';

import { ModalContext } from './Modal.context';
import { ModalProps } from './types';

const Modal = ({ isOpen, ...rest }: ModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen || false);

  useEffect(() => {
    if (isOpen !== undefined && isOpen !== modalIsOpen) {
      setModalIsOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={[modalIsOpen, setModalIsOpen]} {...rest} />
  );
};

export default Modal;
