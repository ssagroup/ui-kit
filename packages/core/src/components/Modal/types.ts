import type { ModalDialogProps } from '@components/ModalDialog';
export type ModalContextProps = [boolean, (isOpen: boolean) => void];

export type ModalProps = Partial<ModalDialogProps> & {
  /** When true (default), render modal in a portal to document.body. Set to false to render in place (e.g. inside a Drawer). */
  usePortal?: boolean;
};
