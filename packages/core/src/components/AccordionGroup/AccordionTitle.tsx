import { Fragment } from 'react';
import CardHeaderBase from '@components/CardHeader/CardHeaderBase';
import { AccordionProps } from './types';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import { createTitleStyles } from './styles';

const CardHeaderBaseButton = CardHeaderBase.withComponent('button');

export const AccordionTitle: AccordionProps['renderTitle'] = ({
  title,
  size = 'empty',
  id,
  isOpened,
  ariaControls,
  onClick,
}) => {
  const theme = useTheme();
  const styles = createTitleStyles(theme, isOpened);
  return (
    <CardHeaderBaseButton
      type="button"
      data-testid="accordion-title"
      css={styles[size]}
      id={`${id}`}
      aria-expanded={isOpened}
      aria-controls={ariaControls}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}>
      <Fragment>
        {title}
        {isOpened ? <Icon name="carrot-down" /> : <Icon name="carrot-up" />}
      </Fragment>
    </CardHeaderBaseButton>
  );
};
