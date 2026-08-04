import { css, Theme, useTheme } from '@emotion/react';

import { resolveOpenState } from '@utils/deprecation';
import { ModalDialogProps } from './types';

const modalDialogWrapper = (
  theme: Theme,
  open: ModalDialogProps['open'],
  noBackground: ModalDialogProps['noBackground'],
) => css`
  display: ${open ? 'flex' : 'none'};

  position: fixed;
  inset: 0;

  justify-content: center;
  align-items: center;

  background-color: ${noBackground ? 'transparent' : theme.colors.grey20};

  z-index: 1000;
`;

const modalDialogContent = (
  theme: Theme,
  open: ModalDialogProps['open'],
) => css`
  display: ${open ? 'flex' : 'none'};

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
 * based on open), optional background overlay (noBackground), and dialog
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
  open,
  isOpen,
  noBackground,
  children,
  'aria-label': ariaLabel,
  ...props
}: ModalDialogProps) => {
  const theme = useTheme();
  const { open: isDialogOpen } = resolveOpenState(
    'ModalDialog',
    { open, isOpen },
    { controlledAlias: 'isOpen' },
  );

  return (
    // The overlay is decoration. It used to carry `role="button"` and
    // `tabIndex={-1}` without a handler or an accessible name, which made it
    // answer to `getByRole('button')` — and compute its name from whatever the
    // dialog happened to contain — for no behaviour at all.
    <div css={modalDialogWrapper(theme, isDialogOpen, noBackground)}>
      <div
        aria-modal="true"
        // `aria-label`, not `aria-labelledby`: the prop is a label string, and
        // `aria-labelledby` takes id references. Pointing it at a non-existent
        // id left the dialog with no accessible name at all. Consumers wanting
        // to label from a heading can still pass a real `aria-labelledby`
        // through `...props`, which is spread after this.
        aria-label={ariaLabel}
        role="dialog"
        css={modalDialogContent(theme, isDialogOpen)}
        {...props}>
        {children}
      </div>
    </div>
  );
};

export default ModalDialog;
