import { SerializedStyles } from '@emotion/react';
import { AriaAttributes } from 'react';

/**
 * Size variants for accordion components
 * Controls visual appearance and spacing
 */
export type AccordionSize = 'empty' | 'small' | 'medium' | 'large';

/**
 * Style mapping for accordion sizes
 */
export type SizeStyles = {
  [K in AccordionSize]: SerializedStyles;
};

type AccordionGroupChildren = React.ReactElement<
  React.PropsWithChildren<AccordionViewProps>
>;

/**
 * Props for the AccordionGroup component
 *
 * A container component that manages multiple accordion items and their open/close state.
 * Supports both single and multiple accordion open modes, and provides size variants
 * for different visual appearances.
 *
 * @example
 * ```tsx
 * <AccordionGroupContextProvider>
 *   <AccordionGroup size="large" accordionsStayOpen={true}>
 *     <Accordion
 *       id="first"
 *       title="First Accordion"
 *       ariaControls="first-panel"
 *       renderContent={(props) => (
 *         <AccordionContent {...props}>
 *           <p>Content for first accordion</p>
 *         </AccordionContent>
 *       )}
 *       renderTitle={AccordionTitle}
 *     />
 *     <Accordion
 *       id="second"
 *       title="Second Accordion"
 *       ariaControls="second-panel"
 *       isOpened
 *       renderContent={(props) => (
 *         <AccordionContent {...props}>
 *           <p>Content for second accordion</p>
 *         </AccordionContent>
 *       )}
 *       renderTitle={AccordionTitle}
 *     />
 *   </AccordionGroup>
 * </AccordionGroupContextProvider>
 * ```
 */
export interface AccordionGroupProps {
  /**
   * Unique identifier for the accordion group
   * Used for accessibility and testing purposes
   */
  id?: string;

  /**
   * Accordion components as children
   * Each child should be an Accordion component
   */
  children: AccordionGroupChildren | AccordionGroupChildren[];

  /**
   * Size variant for the accordion group
   * Controls padding, spacing, and visual appearance
   * @default 'empty'
   */
  size?: AccordionSize;

  /**
   * Whether multiple accordions can be open simultaneously
   * When false, opening one accordion closes others
   * @default true
   */
  accordionsStayOpen?: boolean;

  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Props for the Accordion component
 *
 * An individual accordion item that can be expanded or collapsed.
 * Uses render props pattern for flexible content and title rendering.
 *
 * @example
 * ```tsx
 * <Accordion
 *   id="accordion-1"
 *   title="Click to expand"
 *   ariaControls="panel-1"
 *   isOpened={false}
 *   renderTitle={AccordionTitle}
 *   renderContent={(props) => (
 *     <AccordionContent {...props}>
 *       <p>Accordion content goes here</p>
 *     </AccordionContent>
 *   )}
 * />
 * ```
 */
export interface AccordionProps {
  /**
   * Unique identifier for the accordion
   * Used for state management and accessibility
   */
  id: number | string;

  /**
   * Size variant for the accordion
   * Inherits from AccordionGroup if not specified
   */
  size?: AccordionSize;

  /**
   * Render function for the accordion title
   * Receives title data and control props
   */
  renderTitle: (
    data: RenderContentProps & {
      title: string;
      ariaControls?: string;
      onClick?: () => void;
    },
  ) => React.ReactNode;

  /**
   * Render function for the accordion content
   * Receives content props including open state
   */
  renderContent: (accordion: RenderContentProps) => React.ReactNode;

  /**
   * Custom element type to render as
   * Allows composition with other components
   */
  as?: React.ElementType;

  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Props passed to render functions for accordion content
 *
 * Contains accordion state and accessibility attributes
 * that are passed to renderContent and renderTitle functions.
 */
export type RenderContentProps = Pick<AccordionProps, 'id' | 'size'> &
  Pick<AriaAttributes, 'aria-labelledby'> & {
    /**
     * Whether the accordion is currently open
     * @default false
     */
    isOpened?: boolean;

    /**
     * Custom element type to render as
     */
    as?: React.ElementType;

    /**
     * Custom CSS class name
     */
    className?: string;
  } & Record<string, unknown>;

/**
 * Extended props for Accordion component view
 *
 * Includes all AccordionProps plus additional view-specific properties
 * like title, open state, and event handlers.
 */
export interface AccordionViewProps extends AccordionProps {
  /**
   * ARIA controls attribute
   * Links the accordion header to its content panel
   * Should match the id of the content panel
   */
  ariaControls?: string;

  /**
   * Whether the accordion is currently open
   * @default false
   */
  isOpened?: boolean;

  /**
   * Whether the accordion is hidden
   * Used for conditional rendering
   * @default false
   */
  isHidden?: boolean;

  /**
   * Title text displayed in the accordion header
   */
  title: string;

  /**
   * Click handler for the accordion header
   * Called when user clicks to toggle accordion
   */
  onClick?: () => void;

  /**
   * Additional content to render
   */
  children?: React.ReactNode;

  /**
   * Additional props to pass to content render function
   * Allows passing custom props to AccordionContent
   */
  contentProps?: Record<string, unknown>;
}

/**
 * Represents an opened accordion in the group state
 *
 * Used to track which accordions are currently open
 * in the AccordionGroup context.
 */
export type OpenedAccordion = {
  /**
   * Unique identifier of the opened accordion
   */
  id: string | number;
};

/**
 * Context props for AccordionGroup
 *
 * Provides state and control functions to accordion components
 * within an AccordionGroup. Used internally by the context provider.
 */
export interface AccordionGroupContextProps {
  /**
   * Array of currently opened accordions
   * Contains accordion IDs that are currently expanded
   */
  openedAccordions: Array<OpenedAccordion> | [];

  /**
   * Whether multiple accordions can stay open
   * When false, only one accordion can be open at a time
   */
  stayOpen: boolean;

  /**
   * Function to set the opened accordions array
   * Used internally for state management
   */
  setOpenedAccordions: React.Dispatch<
    React.SetStateAction<Array<OpenedAccordion>>
  >;

  /**
   * Function to toggle an accordion's open state
   * @param accordion - The accordion to toggle
   * @param opened - Optional explicit open state (true/false)
   *                 If not provided, toggles based on current state
   */
  toggleOpenedAccordion: (accordion: OpenedAccordion, opened?: boolean) => void;

  /**
   * Function to set whether accordions can stay open
   * Updates the stayOpen behavior dynamically
   */
  setStayOpen: (isStayOpen: boolean) => void;
}
