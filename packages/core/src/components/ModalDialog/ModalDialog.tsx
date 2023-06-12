import { css, Theme, useTheme } from '@emotion/react';

import { ModalDialogProps } from './types';

const modalDialogWrapper = (theme: Theme, isOpen, noBackground) => css`
  display: ${isOpen ? 'flex' : 'none'};

  position: fixed;

  justify-content: center;
  align-items: center;

  background-color: ${noBackground ? 'transparent' : theme.colors.grey20};

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1000;
`;

const modalDialogContent = (theme: Theme, isOpen) => css`
  display: ${isOpen ? 'flex' : 'none'};

  flex-direction: column;
  position: relative;

  width: 100%;
  max-width: 400px;
  padding: 20px;

  background-color: white;
  box-shadow: 0 5px 15px ${theme.colors.grey20};
  border-radius: 20px;
`;

const ModalDialog = ({
  isOpen,
  onDismiss,
  noBackground,
  children,
  'aria-label': ariaLabel,
  ...props
}: ModalDialogProps) => {
  const theme = useTheme();

  return (
    <div
      role="button"
      tabIndex={-1}
      onClick={onDismiss}
      onKeyDown={onDismiss}
      css={modalDialogWrapper(theme, isOpen, noBackground)}>
      <div
        aria-modal="true"
        aria-labelledby={ariaLabel}
        role="dialog"
        css={modalDialogContent(theme, isOpen)}
        {...props}>
        {children}
      </div>
    </div>
  );
};

export default ModalDialog;
