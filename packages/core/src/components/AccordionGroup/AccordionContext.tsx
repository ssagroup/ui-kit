import { createContext, useState, useContext } from 'react';
import { AccordionGroupContextProps, OpenedAccordion } from './types';

/**
 * React context for AccordionGroup state management
 *
 * Provides state and control functions to accordion components within an AccordionGroup.
 * Used internally by AccordionGroupContextProvider and accessed via useAccordionGroupContext hook.
 */
export const AccordionGroupContext = createContext<AccordionGroupContextProps>(
  {} as AccordionGroupContextProps,
);

/**
 * Hook to access AccordionGroup context
 *
 * Returns the AccordionGroup context value including opened accordions state,
 * toggle functions, and stay-open behavior. Must be used within an AccordionGroupContextProvider.
 *
 * @returns AccordionGroupContextProps - Context value with state and control functions
 * @throws Error if used outside AccordionGroupContextProvider
 *
 * @example
 * ```tsx
 * function CustomAccordionControl() {
 *   const { openedAccordions, toggleOpenedAccordion } = useAccordionGroupContext();
 *
 *   return (
 *     <button onClick={() => toggleOpenedAccordion({ id: 'accordion-1' })}>
 *       Toggle Accordion 1
 *     </button>
 *   );
 * }
 * ```
 *
 * @see {@link AccordionGroupContextProvider} - Required provider component
 */
export const useAccordionGroupContext = () => useContext(AccordionGroupContext);

/**
 * Internal hook for managing accordion group state
 *
 * Manages the state of opened accordions and provides toggle functionality.
 * Handles both single and multiple accordion open modes based on stayOpen setting.
 *
 * @returns AccordionGroupContextProps - State and control functions
 */
const useAccordionGroup = (): AccordionGroupContextProps => {
  const [openedAccordions, setOpenedAccordions] = useState<OpenedAccordion[]>(
    [],
  );
  const [stayOpen, setStayOpen] = useState<boolean>(false);

  const toggleOpenedAccordion = (
    accordion: OpenedAccordion,
    opened?: boolean,
  ) => {
    const isOpened =
      opened ??
      !!openedAccordions.find(
        (activeAccordion) => activeAccordion.id === accordion.id,
      );
    if (stayOpen) {
      const newOpenedAccordions = isOpened
        ? openedAccordions.filter(
            (activeAccordion) => activeAccordion.id !== accordion.id,
          )
        : openedAccordions.concat([accordion]);
      setOpenedAccordions(newOpenedAccordions);
    } else {
      setOpenedAccordions(isOpened ? [] : [accordion]);
    }
  };

  return {
    openedAccordions,
    stayOpen,
    setOpenedAccordions,
    toggleOpenedAccordion,
    setStayOpen,
  };
};

/**
 * Props for AccordionGroupContextProvider
 */
export interface AccordionGroupContextProviderProps {
  /**
   * Child components that will have access to accordion context
   * Should include AccordionGroup and Accordion components
   */
  children: React.ReactNode;
}

/**
 * AccordionGroupContextProvider - Context provider for accordion group state
 *
 * Provides accordion state management context to all child components.
 * This provider must wrap any AccordionGroup components to enable state management
 * and coordination between multiple accordions.
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <AccordionGroupContextProvider>
 *   <AccordionGroup>
 *     <Accordion id="1" title="Section 1" renderContent={...} renderTitle={AccordionTitle} />
 *     <Accordion id="2" title="Section 2" renderContent={...} renderTitle={AccordionTitle} />
 *   </AccordionGroup>
 * </AccordionGroupContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Multiple accordion groups in the same provider
 * <AccordionGroupContextProvider>
 *   <AccordionGroup size="large">
 *     <Accordion id="group1-1" ... />
 *   </AccordionGroup>
 *   <AccordionGroup size="medium">
 *     <Accordion id="group2-1" ... />
 *   </AccordionGroup>
 * </AccordionGroupContextProvider>
 * ```
 *
 * @see {@link AccordionGroup} - Component that requires this provider
 * @see {@link useAccordionGroupContext} - Hook to access context
 */
export const AccordionGroupContextProvider = ({
  children,
}: AccordionGroupContextProviderProps) => {
  const {
    openedAccordions,
    stayOpen,
    setOpenedAccordions,
    toggleOpenedAccordion,
    setStayOpen,
  } = useAccordionGroup();

  return (
    <AccordionGroupContext.Provider
      value={{
        openedAccordions,
        stayOpen,
        setOpenedAccordions,
        toggleOpenedAccordion,
        setStayOpen,
      }}>
      {children}
    </AccordionGroupContext.Provider>
  );
};
