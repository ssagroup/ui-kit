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
  <CardBase role="region" tabIndex={0} title={title} css={wrapperStyles[size]}>
    {renderTitle({ id, isOpened, title, size, ariaControls, onClick })}
    {renderContent({
      id: `${ariaControls}`,
      isOpened,
      size,
      ...{ ['aria-labelledby']: `${id}` },
    })}
  </CardBase>
);
