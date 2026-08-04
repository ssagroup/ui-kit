import { Modal, ModalOpenButton, ModalContent } from '@ssa-ui-kit/core';
import { useModals } from '@fintech/modals';
import { ModalHeader } from './ModalHeader';
import { ModalButtons } from './ModalButtons';
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
    // `open` is fully controlled, so the modal cannot move itself: without
    // `onOpenChange` the ModalOpenButton and the ModalDismissButtons inside
    // ModalButtons would fire and do nothing. Closing goes through the modals
    // context, which unmounts this whole subtree.
    <Modal
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onCloseHandle();
        }
      }}>
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
