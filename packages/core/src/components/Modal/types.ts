import type { ModalDialogProps } from '@components/ModalDialog';
export type ModalContextProps = [boolean, (isOpen: boolean) => void];

export type ModalProps = Partial<ModalDialogProps> & {
  /** When true, render modal in a portal to document.body. When false (default), render in place (e.g. inside a Drawer). */
  usePortal?: boolean;
};
