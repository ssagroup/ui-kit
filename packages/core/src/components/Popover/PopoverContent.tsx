import * as React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { usePopoverContext } from './hooks/usePopoverContext';
import Wrapper from '@components/Wrapper';
import { MountMode } from './types';

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & {
    isFocusManagerDisabled?: boolean;
    mountMode?: MountMode;
  }
>(function PopoverContent(
  { style, isFocusManagerDisabled = false, mountMode = 'unmount', ...props },
  propRef,
) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  const keepMounted = mountMode === 'keep-mounted';
  if (!keepMounted && !floatingContext.open) return null;

  const hidden = keepMounted && !floatingContext.open;

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
          style={{
            ...context.floatingStyles,
            ...(hidden ? { display: 'none', pointerEvents: 'none' } : null),
            ...style,
          }}
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
