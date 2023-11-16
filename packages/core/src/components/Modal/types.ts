import type { ModalDialogProps } from '@components/ModalDialog';
export type ModalContextProps = [boolean, (isOpen: boolean) => void];

export type ModalProps = Partial<ModalDialogProps>;
