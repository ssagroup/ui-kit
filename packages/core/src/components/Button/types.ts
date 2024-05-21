import { AriaAttributes } from 'react';
import { SerializedStyles, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';

/**
 * https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
type ButtonAriaProps = Pick<
  AriaAttributes,
  | 'aria-labelledby'
  | 'aria-label'
  | 'aria-describedby'
  | 'aria-disabled'
  | 'aria-pressed'
  | 'aria-current'
>;

export interface ButtonProps extends ButtonAriaProps {
  block?: boolean;
  size?: keyof MainSizes;
  text?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: keyof ButtonVariants | 'custom';
  type?: 'button' | 'reset' | 'submit';
  isDisabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export interface ButtonVariants {
  primary: (theme: Theme) => SerializedStyles;
  info: (theme: Theme) => SerializedStyles;
  secondary: (theme: Theme) => SerializedStyles;
  tertiary: (theme: Theme) => SerializedStyles;
  attention: (theme: Theme) => SerializedStyles;
}

export type ButtonTextProps = {
  text: string;
  className?: string;
  testId?: string;
};

export type ColoredButtonTextProps = Required<Pick<ButtonProps, 'size'>> & {
  text: string;
};
