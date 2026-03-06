import CardBase from '@components/Card/CardBase';
import { AccordionViewProps } from './types';
import { wrapperStyles } from './styles';

/**
 * Accordion - Individual accordion item component
 *
 * A single accordion item that can be expanded or collapsed. Uses render props pattern
 * for flexible content and title rendering. Must be used as a child of AccordionGroup.
 *
 * The component renders a CardBase with a title header and collapsible content panel.
 * The open/close state is managed by the parent AccordionGroup through context.
 *
 * @category Components
 * @subcategory Layout
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
 *
 * @see {@link AccordionGroup} - Parent container component
 * @see {@link AccordionTitle} - Default title render function
 * @see {@link AccordionContent} - Default content component
 *
 * @accessibility
 * - Uses role="region" for semantic structure
 * - ARIA controls and labelledby attributes for accessibility
 * - Keyboard accessible
 */
export const Accordion = ({
  title,
  isOpened,
  ariaControls,
  id,
  size = 'empty',
  contentProps,
  renderTitle,
  renderContent,
  onClick,
  ...rest
}: AccordionViewProps) => (
  <CardBase role="region" tabIndex={0} css={wrapperStyles[size]} {...rest}>
    {renderTitle({ id, isOpened, title, size, ariaControls, onClick })}
    {renderContent({
      id: `${ariaControls}`,
      isOpened,
      size,
      ...contentProps,
      ...{ ['aria-labelledby']: `${id}` },
    })}
  </CardBase>
);
