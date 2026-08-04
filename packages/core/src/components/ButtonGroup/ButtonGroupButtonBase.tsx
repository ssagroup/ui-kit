import { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';

import Button from '@components/Button';
import Typography from '@components/Typography';

import { ButtonItem } from './styles';

// Declared here rather than in `types.ts`, which is re-exported wholesale from
// the package index — this shape is internal.
interface ButtonGroupButtonBaseProps {
  isActive: boolean;
  disabled?: boolean;
  onClick: () => void;
  buttonStyles?: SerializedStyles;
  className?: string;
  children?: ReactNode;
}

/**
 * The button markup shared by both of `ButtonGroup`'s APIs.
 *
 * `ButtonGroupButton` wires this to the group context; the `items` path renders
 * it directly, so it can keep reporting the caller's own item object rather
 * than one reassembled from props. Everything visual — the secondary/small
 * variant, the `active` class the styles key off, `aria-pressed` — lives here
 * once.
 *
 * Internal: not exported from the package.
 */
export const ButtonGroupButtonBase = ({
  isActive,
  disabled,
  onClick,
  buttonStyles,
  className,
  children,
}: ButtonGroupButtonBaseProps) => (
  <Button
    aria-pressed={isActive}
    variant="secondary"
    size="small"
    disabled={disabled}
    aria-disabled={disabled}
    onClick={onClick}
    css={[ButtonItem, buttonStyles]}
    className={[isActive ? 'active' : '', className].filter(Boolean).join(' ')}>
    {typeof children === 'string' ? (
      <Typography variant="body1">{children}</Typography>
    ) : (
      children
    )}
  </Button>
);
