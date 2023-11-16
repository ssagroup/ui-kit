import type { ModalDialogProps } from '@components/ModalDialog';
export type ModalContextProps = [boolean, (isOpen: boolean) => void];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModalProps extends Partial<ModalDialogProps> {}
