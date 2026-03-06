import { CONFIRMATION_MODAL } from './constants';

export interface ModalInformation {
  id: typeof CONFIRMATION_MODAL;
  trigger?: React.JSX.Element;
  title: React.ReactNode;
  content: string | React.JSX.Element;
  isDismissButton?: boolean;
  confirmationBtnText: string;
  onClose?: () => void;
  onConfirm: () => void;
}

export interface ModalsContextType {
  isOpen: boolean;
  modalInfo: ModalInformation;
  openModal: (modalInfo: ModalInformation) => void;
  closeModal: () => void;
  setModalInfo: (data: ModalInformation) => void;
}
