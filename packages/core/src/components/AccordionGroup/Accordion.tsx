import CardBase from '@components/Card/CardBase';
import { AccordionProps } from './types';
import { createWrapperStyles } from './styles';

const Accordion = ({
  title,
  isActive,
  ariaControls,
  tabId,
  variant = 'empty',
  renderTitle,
  renderContent,
  onClick,
}: AccordionProps) => {
  const styles = createWrapperStyles();
  return (
    <CardBase
      role="tab"
      id={`${tabId}`}
      aria-selected={isActive}
      aria-controls={ariaControls}
      tabIndex={0}
      title={title}
      css={styles[variant]}>
      {renderTitle({ tabId, isActive, title, variant, onClick })}
      {renderContent({ tabId, isActive, variant })}
    </CardBase>
  );
};

export default Accordion;
