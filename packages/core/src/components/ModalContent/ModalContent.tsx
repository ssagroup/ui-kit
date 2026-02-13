import { useContext } from 'react';
import { createPortal } from 'react-dom';

import ModalDialog from '@components/ModalDialog';
import { ModalProps } from '@components/Modal/types';
import { ModalContext } from '@components/Modal';

/**
 * ModalContent - Dialog content and overlay container
 *
 * Renders the modal dialog content when the modal is open. Uses ModalContext
 * to read open state. Can render in place (default) or in a portal to
 * document.body when usePortal is true (e.g. for modals inside a Drawer that
 * should center on the full screen).
 *
 * Only renders when modal is open. Accepts ModalDialog props (aria-label,
 * noBackground, className) and usePortal. Must be used within Modal.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <Modal>
 *   <ModalOpenButton><Button>Open</Button></ModalOpenButton>
 *   <ModalContent aria-label="Example dialog">
 *     <p>Content</p>
 *     <ModalDismissButton><Button>Close</Button></ModalDismissButton>
 *   </ModalContent>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // With portal (e.g. inside Drawer) - centers on full screen
 * <ModalContent aria-label="Dialog" usePortal>
 *   ...
 * </ModalContent>
 * ```
 *
 * @see {@link Modal} - Parent component that provides context
 * @see {@link ModalOpenButton} - Trigger to open
 * @see {@link ModalDismissButton} - Trigger to close
 *
 * @accessibility
 * - aria-label should be set for screen readers
 * - Renders in portal when usePortal for proper stacking
 */
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
