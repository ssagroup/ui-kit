import React from 'react';

import { useTheme } from '@emotion/react';
import { useMergeRefs } from '@floating-ui/react';

import { PopoverTrigger, TableRow, usePopoverContext } from '@ssa-ui-kit/core';

export const EventInfoPopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> &
    Parameters<typeof TableRow>[0] &
    Parameters<typeof PopoverTrigger>[0]
>(function PopoverTrigger(
  { children, asChild = false, dataTestId = 'trigger-button', ...props },
  propRef,
) {
  const context = usePopoverContext();
  const theme = useTheme();
  const childrenRef = (
    children as React.ReactNode & { ref: React.Ref<unknown> }
  )?.ref;
  const ref = useMergeRefs([context?.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context?.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <TableRow
      css={{
        height: 'auto',
        fontSize: 12,
        color: theme.colors.greyDarker,
        background: theme.colors.greyPopoverLight,
        borderRadius: 6,
        minWidth: '100%',
      }}
      data-testid={dataTestId}
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context?.open ? 'open' : 'closed'}
      {...context?.getReferenceProps(props)}>
      {children}
    </TableRow>
  );
});
