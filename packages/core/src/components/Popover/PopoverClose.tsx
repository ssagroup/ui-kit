import * as React from 'react';

import Button from '@components/Button';

import { usePopoverContext } from './hooks/usePopoverContext';

export const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function PopoverClose(props, ref) {
  const { setOpen } = usePopoverContext();
  return (
    <Button
      ref={ref}
      variant="secondary"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        setOpen(false);
      }}
    />
  );
});
