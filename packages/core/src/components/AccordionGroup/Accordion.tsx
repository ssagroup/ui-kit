import CardBase from '@components/Card/CardBase';
import { AccordionViewProps } from './types';
import { wrapperStyles } from './styles';

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
