import { SmallTabProps } from '@components/TabBar/types';
import { resolveAriaProp } from '@utils/deprecation';

import { TabBase } from './TabBase';

const Tab = ({
  onClick,
  isActive,
  text,
  'aria-controls': ariaControlsNative,
  ariaControls,
  tabId,
  className,
}: SmallTabProps) => {
  return (
    <TabBase
      role="tab"
      id={`${tabId}`}
      aria-selected={isActive}
      aria-controls={resolveAriaProp(
        'Tab',
        'aria-controls',
        ariaControlsNative,
        ariaControls,
      )}
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
