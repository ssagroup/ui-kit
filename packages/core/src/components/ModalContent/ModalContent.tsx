import { useContext } from 'react';

import ModalDialog from '@components/ModalDialog';
import { ModalProps } from '@components/Modal/types';

import { ModalContext } from '../Modal/Modal.context';

function ModalContent({
  children,
  'aria-label': ariaLabel,
  ...props
}: ModalProps) {
  const [isOpen] = useContext(ModalContext);

  return (
    <ModalDialog aria-label={ariaLabel} isOpen={isOpen} {...props}>
      {isOpen ? children : null}
    </ModalDialog>
  );
}

export default ModalContent;
