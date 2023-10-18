import Icon from '@components/Icon';
import { IButtonProps } from './types';

export type TestPropsType = Omit<
  IButtonProps,
  'isDisabled' | 'startIcon' | 'endIcon'
> & {
  disabled?: boolean;
  startIcon?: React.ComponentProps<typeof Icon>['name'];
  endIcon?: React.ComponentProps<typeof Icon>['name'];
};

const baseSpecs: TestPropsType[] = [
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: false,
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: false,
    endIcon: 'plus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: false,
    startIcon: 'minus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: false,
    startIcon: 'minus',
    endIcon: 'plus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    disabled: false,
    startIcon: 'minus',
    endIcon: 'plus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    disabled: false,
    startIcon: 'minus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    disabled: false,
    endIcon: 'plus',
  },

  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: true,
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: true,
    endIcon: 'plus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: true,
    startIcon: 'minus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    text: 'Button',
    disabled: true,
    startIcon: 'minus',
    endIcon: 'plus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    disabled: true,
    startIcon: 'minus',
    endIcon: 'plus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    disabled: true,
    startIcon: 'minus',
  },
  {
    type: 'button',
    variant: 'primary',
    size: 'small',
    disabled: true,
    endIcon: 'plus',
  },
];

export const primaryBtnSpecs = [
  ...baseSpecs,
  ...baseSpecs.map((s) => ({ ...s, size: undefined })),
  ...baseSpecs.map((s) => ({ ...s, size: 'medium' as IButtonProps['size'] })),
  ...baseSpecs.map((s) => ({ ...s, size: 'large' as IButtonProps['size'] })),
  ...baseSpecs.map((s) => ({
    ...s,
    size: 'small' as IButtonProps['size'],
    type: 'submit' as IButtonProps['type'],
  })),
  ...baseSpecs.map((s) => ({
    ...s,
    size: 'medium' as IButtonProps['size'],
    type: 'submit' as IButtonProps['type'],
  })),
  ...baseSpecs.map((s) => ({
    ...s,
    size: 'large' as IButtonProps['size'],
    type: 'submit' as IButtonProps['type'],
  })),
];

export const secondaryBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'secondary' as IButtonProps['variant'],
}));

export const tertiaryBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'tertiary' as IButtonProps['variant'],
}));

export const infoBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'info' as IButtonProps['variant'],
}));

export const attentionBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'attention' as IButtonProps['variant'],
}));
