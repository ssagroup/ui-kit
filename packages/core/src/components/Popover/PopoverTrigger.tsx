import * as React from 'react';
import { useMergeRefs } from '@floating-ui/react';
import Button from '@components/Button';
import { PopoverTriggerProps } from './types';
import { usePopoverContext } from './hooks/usePopoverContext';
import { IButtonProps } from '@components/Button/types';

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & IButtonProps & PopoverTriggerProps
>(function PopoverTrigger({ children, asChild = false, ...props }, propRef) {
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
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context?.open ? 'open' : 'closed'}
      {...context?.getReferenceProps(props)}>
      {children}
    </Button>
  );
});
