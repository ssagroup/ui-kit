const baseSpecs = [
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
  ...baseSpecs.map((s) => ({ ...s, size: null })),
  ...baseSpecs.map((s) => ({ ...s, size: 'medium' })),
  ...baseSpecs.map((s) => ({ ...s, size: 'large' })),
  ...baseSpecs.map((s) => ({ ...s, size: 'small', type: 'submit' })),
  ...baseSpecs.map((s) => ({ ...s, size: 'medium', type: 'submit' })),
  ...baseSpecs.map((s) => ({ ...s, size: 'large', type: 'submit' })),
];

export const secondaryBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'secondary',
}));

export const tertiaryBtnSpecs = primaryBtnSpecs.map((s) => ({
  ...s,
  variant: 'tertiary',
}));
