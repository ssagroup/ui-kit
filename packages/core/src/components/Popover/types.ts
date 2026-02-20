import {
  Placement,
  useInteractions,
  UseFloatingReturn,
  UseFloatingOptions,
} from '@floating-ui/react';

/**
 * Interaction modes for popover activation
 * - `click`: Opens on click interaction (default)
 * - `hover`: Opens on hover interaction
 * - `both`: Opens on both click and hover interactions
 */
export type InteractionsEnabled = 'click' | 'hover' | 'both';

/**
 * Mount mode for popover content
 * - `unmount`: Completely unmounts content when closed (default)
 * - `keep-mounted`: Keeps content mounted but hidden when closed
 */
export type MountMode = 'unmount' | 'keep-mounted';

/**
 * Props for the Popover component
 *
 * Root container component for popover system using compound component pattern.
 * Provides context and positioning configuration for PopoverTrigger, PopoverContent,
 * PopoverHeading, PopoverDescription, and PopoverClose. Built on Floating UI for
 * flexible positioning and interaction modes.
 *
 * @example
 * ```tsx
 * <Popover placement="top" interactionsEnabled="click">
 *   <PopoverTrigger>
 *     <Button>Open Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeading variant="h4">Title</PopoverHeading>
 *     <PopoverDescription>This is a popover</PopoverDescription>
 *     <PopoverClose>Close</PopoverClose>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export interface PopoverOptions {
  /**
   * Initial open state for uncontrolled popover
   * @default false
   */
  initialOpen?: boolean;

  /**
   * Preferred placement of the popover relative to trigger
   * Floating UI will auto-adjust if space is insufficient
   * @default 'bottom'
   */
  placement?: Placement;

  /**
   * Whether popover should behave as a modal (traps focus)
   * @default false
   */
  modal?: boolean;

  /**
   * Controlled open state
   * When provided, controls popover visibility externally
   */
  open?: boolean;

  /**
   * Additional Floating UI options for advanced positioning
   * Allows customization of middleware, strategy, and other Floating UI settings
   */
  floatingOptions?: Partial<UseFloatingOptions>;

  /**
   * Interaction mode for popover activation
   * @default 'click'
   */
  interactionsEnabled?: InteractionsEnabled;

  /**
   * Enable keyboard handlers for interactions
   * @default true
   */
  keyboardHandlers?: boolean;

  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export type SetIDs = {
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

/**
 * Props for PopoverTrigger component
 *
 * Trigger element that activates the popover. Can render as a Button (default) or
 * as a custom element when using `asChild` prop. Automatically receives Floating UI
 * reference props for positioning.
 */
export interface PopoverTriggerProps {
  /**
   * Content to render as trigger
   * When `asChild` is true, must be a single React element
   */
  children?: React.ReactNode;

  /**
   * Render trigger as child element instead of Button
   * When true, clones the child element and applies trigger props
   * @default false
   */
  asChild?: boolean;

  /**
   * Test ID for the trigger element
   * @default 'trigger-button'
   */
  dataTestId?: string;
}

type UseInteractions = ReturnType<typeof useInteractions>;

export type UsePopover = (props: PopoverOptions) => {
  open: boolean;
  modal?: boolean;
  labelId?: string;
  descriptionId?: string;
  floatingOptions?: PopoverOptions['floatingOptions'];
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOpen: (open: boolean) => void;
} & UseInteractions &
  UseFloatingReturn;

export type ContextType = ReturnType<UsePopover> & SetIDs;
