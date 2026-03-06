import * as React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { usePopoverContext } from './hooks/usePopoverContext';
import Wrapper from '@components/Wrapper';
import { MountMode } from './types';

/**
 * PopoverContent - Content container for popover
 *
 * Renders the actual popover content that appears when the trigger is activated.
 * Automatically positioned using Floating UI, supports portal rendering, and
 * includes focus management for modal popovers. Can be configured to unmount
 * or keep mounted when closed.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <PopoverHeading variant="h4">Title</PopoverHeading>
 *   <PopoverDescription>Content goes here</PopoverDescription>
 *   <PopoverClose>Close</PopoverClose>
 * </PopoverContent>
 * ```
 *
 * @example
 * ```tsx
 * // Keep content mounted when closed
 * <PopoverContent mountMode="keep-mounted">
 *   <div>This stays in DOM when closed</div>
 * </PopoverContent>
 * ```
 *
 * @see {@link Popover} - Root component
 * @see {@link PopoverTrigger} - Trigger element component
 * @see {@link PopoverHeading} - Accessible heading component
 * @see {@link PopoverDescription} - Accessible description component
 */
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
