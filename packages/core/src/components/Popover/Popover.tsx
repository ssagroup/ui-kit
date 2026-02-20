import * as React from 'react';
import { PopoverOptions } from './types';
import { usePopover } from './hooks/usePopover';
import { PopoverContext } from './hooks/usePopoverContext';

/**
 * Popover - Floating content container component
 *
 * A flexible popover system built on Floating UI that provides floating content
 * containers relative to trigger elements. Uses a compound component pattern with
 * Popover (root), PopoverTrigger (activator), PopoverContent (display),
 * PopoverHeading, PopoverDescription, and PopoverClose (content helpers).
 *
 * Supports multiple interaction modes (click, hover, both), flexible positioning
 * with auto-adjustment via Floating UI middleware, modal and non-modal modes,
 * and comprehensive accessibility features including ARIA attributes and focus
 * management.
 *
 * @category Components
 * @subcategory Overlay
 *
 * @example
 * ```tsx
 * // Basic popover on click
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeading variant="h4">Popover Title</PopoverHeading>
 *     <PopoverDescription>
 *       This is the popover content with helpful information.
 *     </PopoverDescription>
 *     <PopoverClose>Close</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * // Popover with hover interaction
 * <Popover interactionsEnabled="hover">
 *   <PopoverTrigger>
 *     <Icon name="info" />
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeading variant="h4">Information</PopoverHeading>
 *     <PopoverDescription>
 *       This popover appears on hover.
 *     </PopoverDescription>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * // Popover with custom placement
 * <Popover placement="top">
 *   <PopoverTrigger>
 *     <Button>Show Above</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverDescription>
 *       This popover appears above the trigger element.
 *     </PopoverDescription>
 *     <PopoverClose>Close</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * // Advanced positioning with Floating UI middleware
 * <Popover
 *   placement="top"
 *   floatingOptions={{
 *     middleware: [
 *       offset(10),
 *       flip(),
 *       shift({ padding: 8 }),
 *     ],
 *   }}>
 *   <PopoverTrigger>
 *     <Button>Smart Positioning</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeading variant="h4">Smart Positioning</PopoverHeading>
 *     <PopoverDescription>
 *       This popover automatically adjusts its position to stay in view.
 *     </PopoverDescription>
 *     <PopoverClose>Close</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * // Modal popover with controlled state
 * <Popover modal open={isOpen} onOpenChange={setIsOpen}>
 *   <PopoverTrigger>
 *     <Button>Open Modal Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeading variant="h4">Modal Popover</PopoverHeading>
 *     <PopoverDescription>
 *       This is a modal popover that traps focus.
 *     </PopoverDescription>
 *     <PopoverClose>Close</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @see {@link PopoverTrigger} - Trigger element component
 * @see {@link PopoverContent} - Content display component
 * @see {@link PopoverHeading} - Accessible heading component
 * @see {@link PopoverDescription} - Accessible description component
 * @see {@link PopoverClose} - Close button component
 *
 * @accessibility
 * - Keyboard accessible (ESC to close, Enter/Space to activate)
 * - Focus management with FloatingFocusManager for modal popovers
 * - ARIA attributes automatically applied (role, aria-labelledby, aria-describedby)
 * - Screen reader friendly with semantic heading and description components
 * - Focus trap for modal popovers
 */
export const Popover = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: React.ReactNode;
} & PopoverOptions) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};
