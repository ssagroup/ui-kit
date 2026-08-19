import * as React from 'react';
import {
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingArrow,
} from '@floating-ui/react';
import { useTheme } from '@emotion/react';
import { usePopoverContext } from './hooks/usePopoverContext';
import Wrapper from '@components/Wrapper';
import { IconButton } from '@components/IconButton';
import * as surface from '@styles/floatingSurface';
import { PopoverContentProps } from './types';

/** Box size of the built-in close button. */
const CLOSE_BUTTON_SIZE = 24;
/** Its 4px inset on both axes, plus an 8px gap before the content. */
const CLOSE_BUTTON_INSET = `${CLOSE_BUTTON_SIZE + 4 + 8}px`;

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
 * // Surface styling comes from the root, and is shared with Tooltip
 * <Popover color="dark" size="medium" hasArrow>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeading variant="h4">Title</PopoverHeading>
 *     <PopoverDescription>Content goes here</PopoverDescription>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * // Built-in close affordance, off by default
 * <PopoverContent hasCloseButton closeButtonProps={{ icon: 'close-circle-outline' }}>
 *   <PopoverDescription>Dismiss me with the corner button</PopoverDescription>
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
  PopoverContentProps
>(function PopoverContent(
  {
    style,
    isFocusManagerDisabled = false,
    mountMode = 'unmount',
    hasCloseButton = false,
    closeButtonProps,
    ...props
  },
  propRef,
) {
  const { context: floatingContext, ...context } = usePopoverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);
  const theme = useTheme();

  const keepMounted = mountMode === 'keep-mounted';
  if (!keepMounted && !floatingContext.open) return null;

  const hidden = keepMounted && !floatingContext.open;

  const { color, size, hasBorder, hasShadow, hasArrow, arrowProps } = context;

  // The rounded corner belongs to any surface the popover draws itself, not
  // only a colored one — a border or a shadow on square corners reads as a
  // rendering bug.
  const hasSurface = Boolean(color) || Boolean(hasBorder) || Boolean(hasShadow);

  // Matches `IconButton`'s own fallback, so the glyph keeps one color across
  // rest and hover whether or not the surface supplies one.
  const closeIconColor =
    closeButtonProps?.styles?.iconColor ??
    (color ? surface.surfaceTextColors[color](theme) : theme.colors.greyDarker);

  return (
    <FloatingPortal>
      <FloatingFocusManager
        context={floatingContext}
        modal={context.modal}
        disabled={isFocusManagerDisabled}>
        <Wrapper
          ref={ref}
          css={[
            {
              width: 'auto',
              position: 'relative',
            },
            size && surface.surfaceSizes[size],
            hasSurface && surface.radius,
            color && surface.surfaceColors[color](theme),
            hasBorder && surface.border(theme),
            hasShadow && surface.shadow(theme),
            // The close button is absolutely positioned, so it takes no space
            // of its own — the surface has to keep its corner clear or the
            // content runs underneath it.
            hasCloseButton && { paddingRight: CLOSE_BUTTON_INSET },
          ]}
          style={{
            ...context.floatingStyles,
            ...(hidden ? { display: 'none', pointerEvents: 'none' } : null),
            ...style,
          }}
          aria-labelledby={context.labelId}
          aria-describedby={context.descriptionId}
          direction="column"
          {...context.getFloatingProps(props)}>
          {hasArrow && (
            <FloatingArrow
              data-testid="popover-arrow"
              ref={context.arrowRef}
              context={floatingContext}
              width={10}
              height={10}
              {...arrowProps}
              {...surface.resolveSurfaceArrowProps({
                theme,
                color,
                hasBorder,
                overrides: arrowProps,
              })}
            />
          )}
          {hasCloseButton && (
            <IconButton
              icon="cross"
              size="small"
              transparent
              aria-label="Close"
              {...closeButtonProps}
              onClick={() => {
                closeButtonProps?.onClick?.();
                context.setOpen(false);
              }}
              styles={{
                ...closeButtonProps?.styles,
                // Resolved from the surface rather than left to
                // `currentColor`: a global `* { color: … }` reset sets the
                // computed color of the nested svg itself, so `currentColor`
                // would come out dark on every surface.
                iconColor: closeIconColor,
                button: [
                  {
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: `${CLOSE_BUTTON_SIZE}px`,
                    height: `${CLOSE_BUTTON_SIZE}px`,
                    borderRadius: '6px',
                    opacity: 0.6,
                    // `IconButton` recolors the glyph to `primary.main` on
                    // hover, which reads as a blue box on an icon drawn as a
                    // filled shape. The close button dims instead, holding the
                    // glyph at its resting color: `fill` for filled icons,
                    // `stroke` for outlined ones — matched on the attribute
                    // each icon actually declares, so neither is repainted
                    // with the other's property and made to disappear.
                    '&:hover:not(:disabled)': {
                      opacity: 1,
                      '& svg': { color: closeIconColor },
                      '& svg path[fill]': { fill: closeIconColor },
                      '& svg path[stroke]': {
                        stroke: closeIconColor,
                        fill: 'none',
                      },
                    },
                  },
                  closeButtonProps?.styles?.button,
                ],
                icon: [
                  { width: '14px', height: '14px' },
                  closeButtonProps?.styles?.icon,
                ],
              }}
            />
          )}
          {props.children}
        </Wrapper>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
