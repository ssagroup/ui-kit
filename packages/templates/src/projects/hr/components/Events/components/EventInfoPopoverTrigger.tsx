import React from 'react';
import { useTheme } from '@emotion/react';
import { useMergeRefs } from '@floating-ui/react';
import { PopoverTrigger, usePopoverContext, TableRow } from '@ssa-ui-kit/core';

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
  // In React 19, ref is a regular prop, not a special property
  // Access it from the element's props if children is a valid element
  const childrenRef = React.isValidElement(children)
    ? (children.props as { ref?: React.Ref<unknown> })?.ref
    : undefined;
  const ref = useMergeRefs([context?.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement<object>(children)) {
    return React.cloneElement(
      children,
      context?.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      } as React.HTMLProps<HTMLElement>),
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
