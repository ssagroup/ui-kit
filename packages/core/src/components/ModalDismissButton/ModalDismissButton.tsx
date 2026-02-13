import { useContext, cloneElement } from 'react';

import { callAll } from '@ssa-ui-kit/utils';

import { ModalContext } from '../Modal/Modal.context';

/**
 * ModalDismissButton - Trigger element that closes the modal
 *
 * Wraps a single React element (typically a Button) and injects an onClick
 * handler that closes the modal via ModalContext. Preserves the child's
 * existing onClick by calling both. Must be used within Modal.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <Modal>
 *   <ModalOpenButton><Button>Open</Button></ModalOpenButton>
 *   <ModalContent aria-label="Dialog">
 *     <p>Content</p>
 *     <ModalDismissButton>
 *       <Button variant="secondary">Close</Button>
 *     </ModalDismissButton>
 *   </ModalContent>
 * </Modal>
 * ```
 *
 * @see {@link Modal} - Parent component that provides context
 * @see {@link ModalContent} - Content container
 * @see {@link ModalOpenButton} - Trigger to open
 */
function ModalDismissButton({
  children: child,
}: {
  children: React.JSX.Element;
}) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

export default ModalDismissButton;
