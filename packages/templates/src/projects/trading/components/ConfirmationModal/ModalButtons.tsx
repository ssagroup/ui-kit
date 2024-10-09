import styled from '@emotion/styled';
import { ModalDismissButton, Button } from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { ModalButtonsProps } from './types';

const CancelButton = styled(Button)`
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.greyFocused};
  color: ${({ theme }) => theme.colors.greyCancelClearButton};

  &:focus::before {
    display: none;
  }
`;

const ConfirmButton = styled(Button)`
  border-radius: 6px;
  margin-left: 20px;
`;

export const ModalButtons = ({
  confirmationBtnText,
  onConfirm,
  onClose,
  isDismissButton,
  cancelBtnText,
}: ModalButtonsProps) => {
  const { t } = useTranslation();
  return (
    <div css={{ display: 'flex', justifyContent: 'center' }}>
      <ModalDismissButton>
        <CancelButton
          variant="tertiary"
          text={cancelBtnText || t('confirmationModal.cancellationText')}
          onClick={onClose}
        />
      </ModalDismissButton>
      {isDismissButton ? (
        <ModalDismissButton>
          <ConfirmButton
            variant="info"
            text={confirmationBtnText}
            onClick={onConfirm}
          />
        </ModalDismissButton>
      ) : (
        <ConfirmButton
          variant="info"
          text={confirmationBtnText}
          onClick={onConfirm}
        />
      )}
    </div>
  );
};
