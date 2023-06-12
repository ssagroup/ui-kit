import { MouseEventHandler } from 'react';

export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: MouseEventHandler<HTMLLabelElement>;
}
