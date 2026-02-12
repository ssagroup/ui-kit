import { css, Theme, useTheme } from '@emotion/react';

import { ModalDialogProps } from './types';

const modalDialogWrapper = (
  theme: Theme,
  isOpen: ModalDialogProps['isOpen'],
  noBackground: ModalDialogProps['noBackground'],
) => css`
  display: ${isOpen ? 'flex' : 'none'};

  position: fixed;
  inset: 0;

  justify-content: center;
  align-items: center;

  background-color: ${noBackground ? 'transparent' : theme.colors.grey20};

  z-index: 1000;
`;

const modalDialogContent = (
  theme: Theme,
  isOpen: ModalDialogProps['isOpen'],
) => css`
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

/**
 * ModalDialog - Presentational dialog container and overlay
 *
 * Renders the fixed full-screen overlay and centered dialog box. Used internally
 * by ModalContent; typically not used directly. Handles visibility (display
 * based on isOpen), optional background overlay (noBackground), and dialog
 * ARIA attributes (role="dialog", aria-modal).
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * // Usually used via ModalContent
 * <ModalContent aria-label="My dialog">
 *   <div>Dialog body</div>
 * </ModalContent>
 * ```
 *
 * @see {@link Modal} - Root component that provides state
 * @see {@link ModalContent} - Wraps ModalDialog and handles portal
 *
 * @accessibility
 * - role="dialog", aria-modal="true"
 * - aria-label for screen reader label
 * - Fixed overlay for focus containment
 */
const ModalDialog = ({
  isOpen,
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
