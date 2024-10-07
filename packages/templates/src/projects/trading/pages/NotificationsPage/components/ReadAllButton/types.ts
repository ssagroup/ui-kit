import { Button } from '@ssa-ui-kit/core';

export type ReadAllButtonProps = Pick<
  React.ComponentProps<typeof Button>,
  'onClick' | 'text' | 'isDisabled'
>;
