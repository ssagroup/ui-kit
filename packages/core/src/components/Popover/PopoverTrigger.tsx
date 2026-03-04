import * as React from 'react';
import { useMergeRefs } from '@floating-ui/react';
import Button from '@components/Button';
import { ButtonProps } from '@components/Button/types';
import { usePopoverContext } from './hooks/usePopoverContext';
import { PopoverTriggerProps } from './types';

/**
 * PopoverTrigger - Trigger element for popover
 *
 * Activates the popover when interacted with. By default renders as a Button,
 * but can be customized using the `asChild` prop to render as any React element.
 * Automatically receives Floating UI reference props for positioning and state
 * management.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * // Default Button trigger
 * <PopoverTrigger>
 *   Open Popover
 * </PopoverTrigger>
 * ```
 *
 * @example
 * ```tsx
 * // Custom element trigger
 * <PopoverTrigger asChild>
 *   <Icon name="info" />
 * </PopoverTrigger>
 * ```
 *
 * @see {@link Popover} - Root component
 * @see {@link PopoverContent} - Content display component
 */
export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & ButtonProps & PopoverTriggerProps
>(function PopoverTrigger(
  {
    children,
    asChild = false,
    dataTestId = 'trigger-button',
    variant = 'primary',
    ...props
  },
  propRef,
) {
  const context = usePopoverContext();

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenElement = children as React.ReactElement<any>;

    // Extract ref from children props BEFORE calling getReferenceProps to avoid conflicts
    // In React 19, refs are regular props, but forwardRef components may not expose them in children.props.ref
    // We extract it here for backward compatibility
    const { ref: existingChildrenRef, ...childrenPropsWithoutRef } =
      childrenElement.props || {};

    // Merge all refs: floating-ui's setReference, children's ref, and propRef
    // This ensures positioning works while preserving any refs passed to the child component
    const mergedRef = useMergeRefs([
      context?.refs.setReference,
      existingChildrenRef as React.Ref<HTMLElement> | undefined,
      propRef,
    ]);

    // Get reference props from floating-ui - pass the merged ref to it
    // This ensures floating-ui gets the correct element for positioning
    const referenceProps = context?.getReferenceProps({
      ref: mergedRef,
      ...props,
      ...childrenPropsWithoutRef,
      'data-state': context.open ? 'open' : 'closed',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(children, referenceProps as any);
  }

  // For non-asChild case, merge refs normally
  const childrenRef = React.isValidElement(children)
    ? (children.props as { ref?: React.Ref<unknown> })?.ref
    : undefined;
  const ref = useMergeRefs([context?.refs.setReference, propRef, childrenRef]);

  return (
    <Button
      data-testid={dataTestId}
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context?.open ? 'open' : 'closed'}
      variant={variant}
      {...context?.getReferenceProps(props)}>
      {children}
    </Button>
  );
});
