import { SerializedStyles, Theme } from '@emotion/react';

export interface IButtonProps {
  block?: boolean;
  size?: keyof MainSizes;
  text?: string | ((isHovered: boolean) => React.ReactNode);
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: keyof IButtonVariants | 'custom';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface IButtonVariants {
  primary: (theme: Theme) => SerializedStyles;
  secondary: (theme: Theme) => SerializedStyles;
  tertiary: (theme: Theme) => SerializedStyles;
}

export type IButtonTextProps = {
  text: string;
  className?: string;
  testId?: string;
};

export type IColoredButtonTextProps = Required<Pick<IButtonProps, 'size'>> & {
  text: string;
};
