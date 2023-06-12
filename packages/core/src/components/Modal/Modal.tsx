import { useState } from 'react';

import { ModalContext } from './Modal.context';

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
};

export default Modal;
