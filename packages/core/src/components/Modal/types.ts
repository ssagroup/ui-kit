import type { ModalDialogProps } from '@components/ModalDialog';

/**
 * Context value for Modal: [isOpen, setIsOpen].
 * Provided by Modal (root) and consumed by ModalContent, ModalOpenButton, ModalDismissButton.
 */
export type ModalContextProps = [boolean, (isOpen: boolean) => void];

/**
 * Props shared by the Modal root and ModalContent.
 *
 * ModalContent accepts ModalDialog props (aria-label, noBackground, className,
 * children) plus usePortal.
 *
 * @example
 * ```tsx
 * <Modal open={open} onOpenChange={setOpen}>
 *   <ModalContent aria-label="Dialog" usePortal>...</ModalContent>
 * </Modal>
 * ```
 */
export type ModalProps = Partial<ModalDialogProps> & {
  /** When true, render modal in a portal to document.body. When false (default), render in place (e.g. inside a Drawer). */
  usePortal?: boolean;
};

/**
 * Props for the Modal root component.
 *
 * Adds the state props the root owns on top of {@link ModalProps}. Open state
 * has three modes:
 *
 * - **uncontrolled** — pass nothing, or `defaultOpen` for the initial state.
 *   ModalOpenButton / ModalDismissButton drive it.
 * - **controlled** — pass `open` and update it from `onOpenChange`. The modal
 *   never moves on its own.
 * - **legacy** — pass `isOpen`. It seeds the state and re-syncs whenever it
 *   changes, but the buttons can still move the modal out from under it. Kept
 *   working for the deprecation window; prefer `open` + `onOpenChange`.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Modal open={open} onOpenChange={setOpen}>
 *   <ModalContent aria-label="Controlled modal">...</ModalContent>
 * </Modal>
 * ```
 */
export type ModalRootProps = ModalProps & {
  /** Initial open state for an uncontrolled modal. */
  defaultOpen?: boolean;
  /** Called with the state the modal is moving to, from any source. */
  onOpenChange?: (open: boolean) => void;
};
