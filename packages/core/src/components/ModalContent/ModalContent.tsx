import { useContext } from 'react';

import { ModalProps } from '@components/Modal/types';
import ModalDialog from '@components/ModalDialog';

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
