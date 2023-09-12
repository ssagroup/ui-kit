import { Fragment } from 'react';
import CardHeaderBase from '@components/CardHeader/CardHeaderBase';
import { AccordionTab as AccordionTabType } from './types';
import { useTheme } from '@emotion/react';
import { Icon } from '../../..';
import { createTitleStyles } from './styles';

const AccordionTitle: AccordionTabType['renderTitle'] = ({
  title,
  variant = 'empty',
  isActive,
}) => {
  const theme = useTheme();
  const styles = createTitleStyles(theme, isActive);
  return (
    <CardHeaderBase css={styles[variant]}>
      <Fragment>
        {title}
        {isActive ? <Icon name="carrot-down" /> : <Icon name="carrot-up" />}
      </Fragment>
    </CardHeaderBase>
  );
};

export default AccordionTitle;
