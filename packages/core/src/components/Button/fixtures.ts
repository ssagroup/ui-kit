import Icon from '@components/Icon';

import { ButtonProps } from './types';

export type TestPropsType = Omit<
  ButtonProps,
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
  ...baseSpecs.map((s) => ({ ...s, size: 'medium' as ButtonProps['size'] })),
  ...baseSpecs.map((s) => ({ ...s, size: 'large' as ButtonProps['size'] })),
  ...baseSpecs.map((s) => ({
    ...s,
    size: 'small' as ButtonProps['size'],
    type: 'submit' as ButtonProps['type'],
  })),
  ...baseSpecs.map((s) => ({
    ...s,
    size: 'medium' as ButtonProps['size'],
    type: 'submit' as ButtonProps['type'],
  })),
  ...baseSpecs.map((s) => ({
    ...s,
    size: 'large' as ButtonProps['size'],
    type: 'submit' as ButtonProps['type'],
  })),
];

export const secondaryBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'secondary' as ButtonProps['variant'],
}));

export const tertiaryBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'tertiary' as ButtonProps['variant'],
}));

export const infoBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'info' as ButtonProps['variant'],
}));

export const attentionBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'attention' as ButtonProps['variant'],
}));
