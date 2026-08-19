import {
  FloatingArrow,
  OffsetOptions,
  Placement,
  useInteractions,
  UseFloatingReturn,
  UseFloatingOptions,
} from '@floating-ui/react';
import {
  FloatingSurfaceColor,
  FloatingSurfaceSize,
} from '@styles/floatingSurface';
import { IconButtonProps } from '@components/IconButton/types';

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
  defaultOpen?: boolean;

  /**
   * Initial open state for uncontrolled popover
   *
   * @deprecated Use `defaultOpen` instead — `initialOpen` is removed in the
   * next major release.
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

  /**
   * Color scheme of the popover surface. Shared with Tooltip — see
   * {@link FloatingSurfaceColor}.
   *
   * Left unset, the popover renders unstyled (no background, border or
   * shadow) and its content supplies its own surface, which is how every
   * popover in the kit behaved before this prop existed.
   */
  color?: FloatingSurfaceColor;

  /**
   * Padding/typography scale of the popover surface. Unset means no padding is
   * applied, leaving spacing to the content.
   */
  size?: FloatingSurfaceSize;

  /**
   * Whether the surface (and its arrow) is outlined with a 1px border
   * @default true when `color` is `'white'`, false otherwise
   */
  hasBorder?: boolean;

  /**
   * Whether the surface casts a drop shadow
   * @default true when `color` is set, false otherwise
   */
  hasShadow?: boolean;

  /**
   * Whether to display an arrow pointing at the trigger
   * @default false
   */
  hasArrow?: boolean;

  /**
   * Additional props for the arrow element
   */
  arrowProps?: PopoverArrowProps;

  /**
   * Offset between the trigger and the popover
   * @default 12 when `hasArrow` is set, 5 otherwise
   */
  offsetOptions?: OffsetOptions;
}

export type PopoverArrowProps = Omit<
  React.ComponentProps<typeof FloatingArrow>,
  'context'
>;

/**
 * Props for PopoverContent component
 */
export interface PopoverContentProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Disables the focus manager wrapping the content
   * @default false
   */
  isFocusManagerDisabled?: boolean;

  /**
   * Whether closed content is unmounted or kept mounted but hidden
   * @default 'unmount'
   */
  mountMode?: MountMode;

  /**
   * Renders a close button in the top-right corner of the surface
   * @default false
   */
  hasCloseButton?: boolean;

  /**
   * Props forwarded to the built-in close button, e.g. `icon`, `size` or
   * `aria-label`
   */
  closeButtonProps?: Partial<Omit<IconButtonProps, 'onClick'>>;
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
 * reference props for positioning. Extends ButtonProps so you can pass Button props
 * such as variant (default `primary`), size, css, etc.
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

export type UsePopover = (props: PopoverOptions) => Pick<
  PopoverOptions,
  'color' | 'size' | 'hasArrow' | 'arrowProps'
> & {
  hasBorder: boolean;
  hasShadow: boolean;
  arrowRef: React.RefObject<SVGSVGElement | null>;
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
