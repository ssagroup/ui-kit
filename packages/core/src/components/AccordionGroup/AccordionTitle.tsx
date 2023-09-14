import { Fragment } from 'react';
import CardHeaderBase from '@components/CardHeader/CardHeaderBase';
import { AccordionProps } from './types';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import { createTitleStyles } from './styles';

export const AccordionTitle: AccordionProps['renderTitle'] = ({
  title,
  size = 'empty',
  isOpened: isActive,
  onClick,
}) => {
  const theme = useTheme();
  const styles = createTitleStyles(theme, isActive);
  return (
    <CardHeaderBase
      as="h3"
      css={styles[size]}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}>
      <Fragment>
        {title}
        {isActive ? <Icon name="carrot-down" /> : <Icon name="carrot-up" />}
      </Fragment>
    </CardHeaderBase>
  );
};
