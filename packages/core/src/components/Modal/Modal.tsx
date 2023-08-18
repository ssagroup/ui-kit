import { useState } from 'react';

import { ModalContext } from './Modal.context';
import { ModalProps } from './types';

const Modal = ({ isOpen: isInitOpen, ...rest }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(isInitOpen || false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...rest} />;
};

export default Modal;
