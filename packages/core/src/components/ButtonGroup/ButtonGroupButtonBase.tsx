import { ReactNode } from 'react';
import { SerializedStyles } from '@emotion/react';

import Button from '@components/Button';
import Typography from '@components/Typography';

import {
  ButtonItem,
  IconOnlyItem,
  IconSlot,
  IconSlotWithLabel,
} from './styles';

// Declared here rather than in `types.ts`, which is re-exported wholesale from
// the package index — this shape is internal.
interface ButtonGroupButtonBaseProps {
  isActive: boolean;
  disabled?: boolean;
  onClick: () => void;
  buttonStyles?: SerializedStyles;
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
}

/**
 * Whether this button shows a label at all. `false` and `null` are what a
 * `cond && <span/>` child collapses to, and an empty string is what the `items`
 * path passes for an item with no `text` — none of them are a label.
 *
 * Exported so the `items` path decides what counts as a label the same way this
 * one does: a button that renders as icon-only must also report itself as one.
 */
export const hasLabel = (children: ReactNode) =>
  children !== undefined &&
  children !== null &&
  children !== false &&
  children !== '';

/**
 * The button markup shared by both of `ButtonGroup`'s APIs.
 *
 * `ButtonGroupButton` wires this to the group context; the `items` path renders
 * it directly, so it can keep reporting the caller's own item object rather
 * than one reassembled from props. Everything visual — the secondary/small
 * variant, the `active` class the styles key off, `aria-pressed` — lives here
 * once.
 *
 * The three content modes are derived here, from which props are set rather
 * than by inspecting what `children` renders to: an opaque `ReactNode` cannot
 * be told apart from a label, so a component that happens to render an icon
 * would otherwise silently change the button's shape.
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
  icon,
  ariaLabel,
}: ButtonGroupButtonBaseProps) => {
  const isIconOnly = Boolean(icon) && !hasLabel(children);

  return (
    <Button
      aria-pressed={isActive}
      aria-label={ariaLabel}
      variant="secondary"
      size="small"
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      css={[ButtonItem, isIconOnly && IconOnlyItem, buttonStyles]}
      className={[isActive ? 'active' : '', className]
        .filter(Boolean)
        .join(' ')}>
      {icon ? (
        <span css={[IconSlot, !isIconOnly && IconSlotWithLabel]}>{icon}</span>
      ) : null}
      {typeof children === 'string' ? (
        <Typography variant="body1">{children}</Typography>
      ) : (
        children
      )}
    </Button>
  );
};
