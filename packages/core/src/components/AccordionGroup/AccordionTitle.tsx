import { Fragment } from 'react';
import { useTheme } from '@emotion/react';
import CardHeaderBase from '@components/CardHeader/CardHeaderBase';
import Icon from '@components/Icon';
import { AccordionProps } from './types';
import { createTitleStyles } from './styles';

const CardHeaderBaseButton = CardHeaderBase.withComponent('button');

/**
 * AccordionTitle - Default render function for accordion headers
 *
 * A pre-built render function for accordion titles that displays the title text
 * with an expand/collapse icon indicator. Can be used as the `renderTitle` prop
 * for Accordion components, or as a reference for custom title implementations.
 *
 * Features:
 * - Displays title text with icon indicator
 * - Shows carrot-up icon when closed, carrot-down when open
 * - Proper ARIA attributes for accessibility
 * - Click handler for toggling accordion state
 *
 * @category Components
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Accordion
 *   id="example"
 *   title="My Accordion"
 *   renderTitle={AccordionTitle}
 *   renderContent={...}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom title using AccordionTitle as reference
 * <Accordion
 *   renderTitle={({ title, isOpened, onClick }) => (
 *     <button onClick={onClick} aria-expanded={isOpened}>
 *       <span>{title}</span>
 *       <Icon name={isOpened ? "chevron-down" : "chevron-right"} />
 *     </button>
 *   )}
 * />
 * ```
 *
 * @see {@link Accordion} - Parent component that uses this render function
 */
export const AccordionTitle: AccordionProps['renderTitle'] = ({
  title,
  size = 'empty',
  id,
  isOpened,
  ariaControls,
  className,
  onClick,
  ...props
}) => {
  const theme = useTheme();
  const styles = createTitleStyles(theme, isOpened);
  return (
    <CardHeaderBaseButton
      type="button"
      data-testid="accordion-title"
      css={styles[size]}
      className={className}
      id={`${id}`}
      aria-expanded={isOpened}
      aria-controls={ariaControls}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
      {...props}>
      <Fragment>
        {title}
        {isOpened ? <Icon name="carrot-down" /> : <Icon name="carrot-up" />}
      </Fragment>
    </CardHeaderBaseButton>
  );
};
