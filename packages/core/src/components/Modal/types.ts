import type { ModalDialogProps } from '@components/ModalDialog';

/**
 * Context value for Modal: [isOpen, setIsOpen].
 * Provided by Modal (root) and consumed by ModalContent, ModalOpenButton, ModalDismissButton.
 */
export type ModalContextProps = [boolean, (isOpen: boolean) => void];

/**
 * Props for the Modal root and ModalContent components.
 *
 * Modal root accepts isOpen for controlled usage; ModalContent accepts
 * ModalDialog props (aria-label, noBackground, className, children) plus usePortal.
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen}>
 *   <ModalContent aria-label="Dialog" usePortal>...</ModalContent>
 * </Modal>
 * ```
 */
export type ModalProps = Partial<ModalDialogProps> & {
  /** When true, render modal in a portal to document.body. When false (default), render in place (e.g. inside a Drawer). */
  usePortal?: boolean;
};
