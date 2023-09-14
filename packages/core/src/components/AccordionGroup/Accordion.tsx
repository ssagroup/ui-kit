import CardBase from '@components/Card/CardBase';
import { AccordionViewProps } from './types';
import { wrapperStyles } from './styles';

export const Accordion = ({
  title,
  isOpened,
  ariaControls,
  id,
  size = 'empty',
  renderTitle,
  renderContent,
  onClick,
}: AccordionViewProps) => (
  <CardBase
    role="tab"
    id={`${id}`}
    aria-selected={isOpened}
    aria-controls={ariaControls}
    tabIndex={0}
    title={title}
    css={wrapperStyles[size]}>
    {renderTitle({ id, isOpened, title, size, onClick })}
    {renderContent({ id, isOpened, size })}
  </CardBase>
);
