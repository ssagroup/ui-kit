import { useRef } from 'react';
import { useCallbackRef, useControllableState } from '@ssa-ui-kit/hooks';

import { warnDeprecatedProp } from '@utils/deprecation';
import { isDevEnvironment } from '@utils/environment';
import { ModalContext } from './Modal.context';
import { ModalRootProps } from './types';

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
 * const [open, setOpen] = useState(false);
 * <Modal open={open} onOpenChange={setOpen}>
 *   <ModalContent aria-label="Controlled modal">
 *     <ModalDismissButton><Button>Close</Button></ModalDismissButton>
 *   </ModalContent>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled, but observing every open/close
 * <Modal defaultOpen onOpenChange={(open) => track('modal', open)}>
 *   <ModalContent aria-label="Observed modal">...</ModalContent>
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
const Modal = (props: ModalRootProps) => {
  const { open, defaultOpen, onOpenChange, isOpen, ...rest } = props;

  if (isOpen !== undefined) {
    warnDeprecatedProp('Modal', 'isOpen', 'open');
  }

  // `isOpen` is the legacy semi-controlled path: it seeds the state and
  // re-syncs on change, but ModalOpenButton / ModalDismissButton can still move
  // the modal without telling the parent. `open` is fully controlled.
  const isControlled = 'open' in props;

  const [modalIsOpen, setOpen] = useControllableState<boolean>({
    controlled: isControlled,
    value: open,
    defaultValue: defaultOpen,
    finalValue: false,
    onChange: onOpenChange,
    semiControlled: { active: 'isOpen' in props, value: isOpen },
  });

  // A controlled modal moves only when its parent says so, which makes
  // ModalOpenButton and ModalDismissButton inert unless `onOpenChange` is wired
  // up to feed `open` back. That reads as "the close button is broken", so say
  // so the first time one of them actually tries to move.
  const warnedInertTrigger = useRef(false);

  const setModalIsOpen = useCallbackRef((nextOpen: boolean) => {
    if (
      isDevEnvironment() &&
      isControlled &&
      !onOpenChange &&
      !warnedInertTrigger.current
    ) {
      warnedInertTrigger.current = true;
      console.warn(
        '[ssa-ui-kit] `Modal` was given `open` without `onOpenChange`, so it is ' +
          'fully controlled and cannot move itself — the ModalOpenButton / ' +
          'ModalDismissButton that just fired had no effect.\n' +
          'Pass `onOpenChange` and feed it back into `open`, or use `defaultOpen` ' +
          'if the modal should own its own state.',
      );
    }

    setOpen(nextOpen);
  });

  return (
    <ModalContext.Provider
      value={[Boolean(modalIsOpen), setModalIsOpen]}
      {...rest}
    />
  );
};

export default Modal;
