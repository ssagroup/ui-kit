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
            color && [surface.surfaceColors[color](theme), surface.radius],
            hasBorder && surface.border(theme),
            hasShadow && surface.shadow(theme),
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
              fill={
                arrowProps?.fill ??
                (color ? surface.surfaceBackgrounds[color](theme) : undefined)
              }
              stroke={
                hasBorder
                  ? (arrowProps?.stroke ?? theme.colors.grey)
                  : undefined
              }
              strokeWidth={
                hasBorder ? (arrowProps?.strokeWidth ?? 1) : undefined
              }
            />
          )}
          {hasCloseButton && (
            <IconButton
              icon="cross"
              size="small"
              transparent
              aria-label="Close"
              {...closeButtonProps}
              onClick={() => context.setOpen(false)}
              styles={{
                ...closeButtonProps?.styles,
                // Resolved from the surface rather than left to
                // `currentColor`: a global `* { color: … }` reset sets the
                // computed color of the nested svg itself, so `currentColor`
                // would come out dark on every surface.
                iconColor:
                  closeButtonProps?.styles?.iconColor ??
                  (color ? surface.surfaceTextColors[color](theme) : undefined),
                button: [
                  {
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    opacity: 0.6,
                    // Without this the button's own color comes from a global
                    // `* { color: … }` reset — which outranks inheritance — and
                    // `currentColor` below resolves dark on every surface.
                    color: 'inherit',
                    // `IconButton` recolors the glyph to `primary.main` on
                    // hover, which reads as a blue box on any icon drawn as a
                    // filled shape. The close button dims instead.
                    '&:hover:not(:disabled)': {
                      opacity: 1,
                      '& svg': { color: 'inherit' },
                      '& svg path': { fill: 'none' },
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
