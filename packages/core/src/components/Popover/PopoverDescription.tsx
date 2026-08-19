import * as React from 'react';
import { useId } from '@floating-ui/react';
import { usePopoverContext } from './hooks/usePopoverContext';
import Typography from '@components/Typography';

/**
 * PopoverDescription - Accessible description for popover
 *
 * Provides an accessible description for the popover content. Automatically sets
 * `aria-describedby` on the PopoverContent when mounted. Uses Typography component
 * for consistent styling and supports all Typography props.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * <PopoverDescription variant="body1">
 *   This is the description text for the popover content.
 * </PopoverDescription>
 * ```
 *
 * @see {@link Popover} - Root component
 * @see {@link PopoverContent} - Content container component
 * @see {@link PopoverHeading} - Accessible heading component
 */
export const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  Parameters<typeof Typography>[0]
>(function PopoverDescription(props, ref) {
  const { setDescriptionId, color } = usePopoverContext();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  // `Typography` defaults to dark text, which would be unreadable on a dark
  // surface — inherit the surface's own color instead whenever one is set.
  return (
    <Typography
      as="div"
      color={color ? 'inherit' : undefined}
      {...props}
      ref={ref}
      id={id}
    />
  );
});
