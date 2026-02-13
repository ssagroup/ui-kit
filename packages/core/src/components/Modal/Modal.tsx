import { useEffect, useState } from 'react';

import { ModalContext } from './Modal.context';
import { ModalProps } from './types';

/**
 * Modal - Dialog overlay for focused user interaction
 *
 * A compound component that provides a modal dialog with built-in state management,
 * trigger and dismiss buttons, and optional portal rendering. Use Modal (root),
 * ModalOpenButton (activator), ModalContent (dialog body), and ModalDismissButton
 * (close) together. ModalContent can render in a portal to document.body (usePortal)
 * or in place for use inside other overlays (e.g. Drawer).
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * // Basic modal
 * <Modal>
 *   <ModalOpenButton>
 *     <Button>Open modal</Button>
 *   </ModalOpenButton>
 *   <ModalContent aria-label="Example modal">
 *     <div>
 *       <h3>Title</h3>
 *       <p>Content</p>
 *       <ModalDismissButton>
 *         <Button variant="secondary">Close</Button>
 *       </ModalDismissButton>
 *     </div>
 *   </ModalContent>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled from parent
 * const [isOpen, setIsOpen] = useState(false);
 * <Modal isOpen={isOpen}>
 *   <ModalContent aria-label="Controlled modal">
 *     <ModalDismissButton><Button onClick={() => setIsOpen(false)}>Close</Button></ModalDismissButton>
 *   </ModalContent>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Modal with portal (e.g. inside Drawer) - centers on full screen
 * <ModalContent aria-label="Modal in drawer" usePortal>
 *   ...
 * </ModalContent>
 * ```
 *
 * @see {@link ModalContent} - Dialog content and container
 * @see {@link ModalOpenButton} - Trigger to open
 * @see {@link ModalDismissButton} - Trigger to close
 *
 * @accessibility
 * - Focus trapped within modal when open
 * - aria-label on ModalContent for screen readers
 * - ESC to close (when implemented in ModalDialog)
 * - Focus management on open/close
 */
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
