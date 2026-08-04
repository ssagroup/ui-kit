import { MouseEventHandler } from 'react';
import { CommonProps } from '@global-types/emotion';

export interface LabelProps extends CommonProps {
  htmlFor?: string;
  children: React.ReactNode;
  /** Renders the label in its muted, disabled state. */
  disabled?: boolean;
  /**
   * @deprecated Use `disabled` instead. Removed in the next major release.
   */
  isDisabled?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: MouseEventHandler<HTMLLabelElement>;
}
