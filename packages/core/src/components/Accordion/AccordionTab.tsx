import CardBase from '@components/Card/CardBase';
import { AccordionTabProps } from './types';
import { createWrapperStyles } from './styles';
import { useTheme } from '@emotion/react';

const AccordionTab = ({
  title,
  isActive,
  ariaControls,
  tabId,
  variant = 'empty',
  renderTitle,
  renderContent,
  onClick,
}: AccordionTabProps) => {
  const theme = useTheme();
  const styles = createWrapperStyles(theme);
  return (
    <CardBase
      role="tab"
      id={`${tabId}`}
      aria-selected={isActive}
      aria-controls={ariaControls}
      tabIndex={0}
      title={title}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
      css={styles[variant]}>
      {renderTitle({ tabId, isActive, title, variant })}
      {renderContent({ tabId, isActive, variant })}
    </CardBase>
  );
};

export default AccordionTab;
