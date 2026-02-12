import { useContext } from 'react';
import { createPortal } from 'react-dom';

import ModalDialog from '@components/ModalDialog';
import { ModalProps } from '@components/Modal/types';
import { ModalContext } from '@components/Modal';

function ModalContent({
  children,
  'aria-label': ariaLabel,
  usePortal = false,
  ...props
}: ModalProps) {
  const [isOpen] = useContext(ModalContext);

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <ModalDialog aria-label={ariaLabel} isOpen={isOpen} {...props}>
      {children}
    </ModalDialog>
  );

  // Portal to document.body to ensure modal renders outside any parent containers
  // (e.g., Drawer) and appears centered on the full screen. Set usePortal={false} to render in place.
  if (usePortal && typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}

export default ModalContent;
