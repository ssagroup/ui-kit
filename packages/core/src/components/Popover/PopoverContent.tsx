import * as React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { usePopoverContext } from './hooks/usePopoverContext';
import Wrapper from '@components/Wrapper';

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & {
    isFocusManagerDisabled?: boolean;
  }
>(function PopoverContent(
  { style, isFocusManagerDisabled = false, ...props },
  propRef,
) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager
        context={floatingContext}
        modal={context.modal}
        disabled={isFocusManagerDisabled}>
        <Wrapper
          ref={ref}
          css={{
            width: 'auto',
          }}
          style={{ ...context.floatingStyles, ...style }}
          aria-labelledby={context.labelId}
          aria-describedby={context.descriptionId}
          direction="column"
          {...context.getFloatingProps(props)}>
          {props.children}
        </Wrapper>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
