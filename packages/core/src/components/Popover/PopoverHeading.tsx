import * as React from 'react';
import { useId } from '@floating-ui/react';
import { usePopoverContext } from './hooks/usePopoverContext';
import Typography from '@components/Typography';

/**
 * PopoverHeading - Accessible heading for popover
 *
 * Provides an accessible heading for the popover content. Automatically sets
 * `aria-labelledby` on the PopoverContent when mounted. Uses Typography component
 * for consistent styling and supports all Typography props.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <PopoverHeading variant="h4">
 *   Popover Title
 * </PopoverHeading>
 * ```
 *
 * @see {@link Popover} - Root component
 * @see {@link PopoverContent} - Content container component
 * @see {@link PopoverDescription} - Accessible description component
 */
export const PopoverHeading = React.forwardRef<
  HTMLHeadingElement,
  Parameters<typeof Typography>[0]
>(function PopoverHeading(props, ref) {
  const { setLabelId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-labelledby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <Typography {...props} ref={ref} id={id}>
      {props.children}
    </Typography>
  );
});
