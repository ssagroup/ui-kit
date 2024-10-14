export interface ConfirmationModalProps {
  trigger?: JSX.Element;
  isOpen?: boolean;
  title: React.ReactNode;
  content: JSX.Element | string;
  isDismissButton?: boolean;
  confirmationBtnText: string;
  cancelBtnText?: string;
  onConfirm: () => void;
  onClose?: () => void;
}

export type ModalHeaderProps = Pick<
  ConfirmationModalProps,
  'title' | 'onClose'
>;

export type ModalButtonsProps = Pick<
  ConfirmationModalProps,
  | 'confirmationBtnText'
  | 'onConfirm'
  | 'onClose'
  | 'isDismissButton'
  | 'cancelBtnText'
>;

export type ModalMessageProps = Pick<ConfirmationModalProps, 'content'>;
