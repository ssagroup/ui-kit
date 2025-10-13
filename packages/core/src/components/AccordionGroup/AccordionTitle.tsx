import { Fragment } from 'react';

import { useTheme } from '@emotion/react';

import CardHeaderBase from '@components/CardHeader/CardHeaderBase';
import Icon from '@components/Icon';

import { createTitleStyles } from './styles';
import { AccordionProps } from './types';

const CardHeaderBaseButton = CardHeaderBase.withComponent('button');

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
