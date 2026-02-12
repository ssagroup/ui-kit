import { useContext, cloneElement } from 'react';

import { ModalContext } from '@components/Modal';

import { callAll } from '@ssa-ui-kit/utils';

/**
 * ModalOpenButton - Trigger element that opens the modal
 *
 * Wraps a single React element (typically a Button) and injects an onClick
 * handler that opens the modal via ModalContext. Preserves the child's
 * existing onClick by calling both. Must be used within Modal.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <Modal>
 *   <ModalOpenButton>
 *     <Button>Open modal</Button>
 *   </ModalOpenButton>
 *   <ModalContent aria-label="Dialog">...</ModalContent>
 * </Modal>
 * ```
 *
 * @see {@link Modal} - Parent component that provides context
 * @see {@link ModalContent} - Content displayed when open
 * @see {@link ModalDismissButton} - Trigger to close
 */
function ModalOpenButton({ children: child }: { children: React.JSX.Element }) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

export default ModalOpenButton;
