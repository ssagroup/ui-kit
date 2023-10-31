import { Button } from '@ssa-ui-kit/core';

export const ActionItem = ({
  children,
  ...rest
}: Parameters<typeof Button>[0]) => (
  <Button
    css={{
      background: 'none',
      padding: '5px 10px',
      color: '#2b2d31',
      fontWeight: 500,
      fontSize: 14,
      gap: 0,
      width: '100%',
      height: 'auto',
      borderRadius: 0,
      textIndent: 10,
      '&:fist-child': {
        paddingTop: 10,
      },
      '&:last-child': {
        paddingBottom: 10,
      },
      '&:hover,&:active,&:focus': {
        background: 'none',
        boxShadow: 'none',
      },
      '&:hover,&:active': {
        background: '#eef1f7',
      },
      '&:hover svg path': {
        background: 'none',
        fill: '#2b2d31',
      },
    }}
    {...rest}>
    {children}
  </Button>
);
