import { Fragment } from 'react';
import CardHeaderBase from '@components/CardHeader/CardHeaderBase';
import { Accordion as AccordionTabType } from './types';
import { useTheme } from '@emotion/react';
import { Icon } from '../../../dist';
import { createTitleStyles } from './styles';

const AccordionTitle: AccordionTabType['renderTitle'] = ({
  title,
  variant = 'empty',
  isActive,
  onClick,
}) => {
  const theme = useTheme();
  const styles = createTitleStyles(theme, isActive);
  return (
    <CardHeaderBase
      as="h3"
      css={styles[variant]}
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

export default AccordionTitle;
