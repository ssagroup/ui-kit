import { Button } from '@ssa-ui-kit/core';

export const ActionButton = (props: Parameters<typeof Button>[0]) => (
  <Button
    {...props}
    css={{
      padding: 0,
      background: 'none',
      '&:hover': {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
      },
      '&:active': {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
      },
      '&:focus': {
        background: 'none',
        border: 'none',
        boxShadow: 'none',
      },
    }}>
    {props.children}
  </Button>
);
