import { MouseEventHandler } from 'react';
import { CommonProps } from '@global-types/emotion';

export interface LabelProps extends CommonProps {
  htmlFor?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: MouseEventHandler<HTMLLabelElement>;
}
