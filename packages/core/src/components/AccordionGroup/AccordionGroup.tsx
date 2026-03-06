import styled from '@emotion/styled';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useAccordionGroupContext } from './AccordionContext';
import { AccordionGroupProps, AccordionProps } from './types';

const AccordionBase = styled.div``;

/**
 * AccordionGroup - Container component for managing multiple accordion items
 *
 * Manages the state and behavior of multiple accordion components within a group.
 * Supports both single and multiple accordion open modes, and provides size variants
 * for different visual appearances. Must be used within an AccordionGroupContextProvider.
 *
 * Component structure:
 * - AccordionGroupContextProvider (required wrapper)
 *   - AccordionGroup (manages accordion state)
 *     - Accordion (individual accordion items)
 *       - AccordionTitle (header with toggle)
 *       - AccordionContent (collapsible content)
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <AccordionGroupContextProvider>
 *   <AccordionGroup size="large" accordionsStayOpen={true}>
 *     <Accordion
 *       id="first"
 *       title="First Section"
 *       ariaControls="first-panel"
 *       renderContent={(props) => (
 *         <AccordionContent {...props}>
 *           <p>Content for first section</p>
 *         </AccordionContent>
 *       )}
 *       renderTitle={AccordionTitle}
 *     />
 *   </AccordionGroup>
 * </AccordionGroupContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Single accordion open mode
 * <AccordionGroup size="medium" accordionsStayOpen={false}>
 *   <Accordion id="1" title="Section 1" renderContent={...} renderTitle={AccordionTitle} />
 *   <Accordion id="2" title="Section 2" renderContent={...} renderTitle={AccordionTitle} />
 * </AccordionGroup>
 * ```
 *
 * @see {@link Accordion} - Individual accordion item component
 * @see {@link AccordionGroupContextProvider} - Required context provider
 * @see {@link AccordionTitle} - Default title render function
 * @see {@link AccordionContent} - Default content component
 *
 * @accessibility
 * - ARIA attributes set according to WAI-ARIA accordion pattern
 * - Keyboard navigation support
 * - Screen reader friendly
 * - Proper focus management
 */
export const AccordionGroup = ({
  children,
  size = 'empty',
  accordionsStayOpen = true,
  ...rest
}: AccordionGroupProps) => {
  const {
    openedAccordions,
    setOpenedAccordions,
    toggleOpenedAccordion,
    setStayOpen,
  } = useAccordionGroupContext();

  useEffect(() => {
    setStayOpen(accordionsStayOpen);
  }, []);

  useLayoutEffect(() => {
    const initialAccordions: AccordionProps[] = [];
    Children.map(children, (child) => {
      if (isValidElement(child) && child.props.isOpened) {
        const { renderContent, renderTitle, ...rest } = child.props;
        initialAccordions.push({
          id: rest.id,
          renderContent: renderContent.bind(null, rest),
          renderTitle: renderTitle.bind(null, rest),
        });
      }
    });
    setOpenedAccordions(initialAccordions);
  }, []);

  return (
    <AccordionBase data-testid="accordion-group" tabIndex={0} {...rest}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const { id } = child.props;
          const isOpened = !!openedAccordions?.find(
            (activeAccordion) => activeAccordion.id === id,
          );

          return cloneElement(child, {
            key: id,
            isOpened,
            size,
            onClick: () =>
              toggleOpenedAccordion({
                id,
              }),
          });
        }
      })}
    </AccordionBase>
  );
};
