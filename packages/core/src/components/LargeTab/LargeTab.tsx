import { useTheme } from '@emotion/react';

import { LargeTabProps } from '@components/TabBar/types';
import { resolveAriaProp } from '@utils/deprecation';

import { LargeTabBase } from './LargeTabBase';

import { topTextStyle, bottomTextStyle } from './styles';

const LargeTab = ({
  topText,
  bottomText,
  isActive,
  onClick,
  'aria-controls': ariaControlsNative,
  ariaControls,
  tabId,
}: LargeTabProps) => {
  const theme = useTheme();
  return (
    <LargeTabBase
      role="tab"
      id={`${tabId}`}
      aria-selected={isActive}
      aria-controls={resolveAriaProp(
        'LargeTab',
        'aria-controls',
        ariaControlsNative,
        ariaControls,
      )}
      tabIndex={0}
      isActive={isActive}
      title={`${topText}-${bottomText}`}
      onClick={() => {
        // istanbul ignore else
        if (typeof onClick === 'function') {
          onClick();
        }
      }}>
      <p css={topTextStyle(theme)}>{topText}</p>
      <p css={bottomTextStyle(theme)}>{bottomText}</p>
    </LargeTabBase>
  );
};
export default LargeTab;
