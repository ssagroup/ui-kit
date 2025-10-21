import { useModals } from '@fintech/modals';

import { Modal, ModalContent, ModalOpenButton } from '@ssa-ui-kit/core';

import { ModalButtons } from './ModalButtons';
import { ModalHeader } from './ModalHeader';
import { ModalMessage } from './ModalMessage';
import { ConfirmationModalProps } from './types';

export const ConfirmationModal = ({
  trigger,
  isOpen,
  title,
  content,
  isDismissButton,
  onConfirm,
  onClose,
  confirmationBtnText,
  cancelBtnText,
}: ConfirmationModalProps) => {
  const { closeModal } = useModals();
  const onCloseHandle = () => {
    closeModal();
    onClose?.();
  };
  return (
    <Modal isOpen={isOpen}>
      {trigger ? <ModalOpenButton>{trigger}</ModalOpenButton> : null}
      <ModalContent>
        <ModalHeader title={title} onClose={onCloseHandle} />
        <ModalMessage content={content} />
        <ModalButtons
          isDismissButton={isDismissButton}
          confirmationBtnText={confirmationBtnText}
          cancelBtnText={cancelBtnText}
          onConfirm={onConfirm}
          onClose={onCloseHandle}
        />
      </ModalContent>
    </Modal>
  );
};
