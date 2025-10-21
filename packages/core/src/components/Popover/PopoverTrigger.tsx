import * as React from 'react';

import { useMergeRefs } from '@floating-ui/react';

import Button from '@components/Button';
import { ButtonProps } from '@components/Button/types';

import { usePopoverContext } from './hooks/usePopoverContext';
import { PopoverTriggerProps } from './types';

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & ButtonProps & PopoverTriggerProps
>(function PopoverTrigger(
  { children, asChild = false, dataTestId = 'trigger-button', ...props },
  propRef,
) {
  const context = usePopoverContext();
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
    <Button
      css={{
        color: '#fff',
      }}
      data-testid={dataTestId}
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context?.open ? 'open' : 'closed'}
      {...context?.getReferenceProps(props)}>
      {children}
    </Button>
  );
});
