import * as React from 'react';
import Button from '@components/Button';
import { usePopoverContext } from './hooks/usePopoverContext';

/**
 * PopoverClose - Close button for popover
 *
 * Renders a button that closes the popover when clicked. Uses Button component
 * with secondary variant by default. Automatically handles closing the popover
 * and supports all standard button props.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <PopoverClose>Close</PopoverClose>
 * ```
 *
 * @example
 * ```tsx
 * // Custom button text and styling
 * <PopoverClose size="small" variant="primary">
 *   Done
 * </PopoverClose>
 * ```
 *
 * @see {@link Popover} - Root component
 * @see {@link PopoverContent} - Content container component
 */
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
