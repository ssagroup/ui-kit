import { SmallTabProps } from '@components/TabBar/types';

import { TabBase } from './TabBase';

const Tab = ({
  onClick,
  isActive,
  text,
  ariaControls,
  tabId,
  className,
}: SmallTabProps) => {
  return (
    <TabBase
      role="tab"
      id={`${tabId}`}
      aria-selected={isActive}
      aria-controls={ariaControls}
      tabIndex={0}
      isActive={isActive}
      title={text}
      className={className}
      onClick={() => {
        // istanbul ignore else
        if (typeof onClick === 'function') {
          onClick();
        }
      }}>
      {text}
    </TabBase>
  );
};
export default Tab;
