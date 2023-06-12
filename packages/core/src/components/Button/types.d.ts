export interface IButtonProps {
  block?: boolean;
  size?: keyof MainSizes;
  text?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: keyof IButtonVariants;
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface IButtonVariants {
  primary: SerializedStyles;
  secondary: SerializedStyles;
  tertiary: SerializedStyles;
}

export type IButtonTextProps = Required<Pick<IButtonProps, 'text'>> & {
  className?: string;
  testId?: string;
};

export type IColoredButtonTextProps = Required<
  Pick<IButtonProps, 'text' | 'size'>
>;

export type IButtonIconProps = Required<
  Pick<IButtonProps, 'iconName' | 'size'>
> & { color?: string; testId?: string };

export type IColoredButtonIconProps = Pick<
  IButtonIconProps,
  'iconName' | 'size'
>;
