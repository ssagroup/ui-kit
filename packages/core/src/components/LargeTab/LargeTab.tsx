import { useTheme } from '@emotion/react';

import { ILargeTabProps } from '@components/TabBar/types';

import { LargeTabBase } from './LargeTabBase';

import { topTextStyle, bottomTextStyle } from './styles';

const LargeTab = ({
  topText,
  bottomText,
  isActive,
  onClick,
  ariaControls,
  tabId,
}: ILargeTabProps) => {
  const theme = useTheme();
  return (
    <LargeTabBase
      role="tab"
      id={`${tabId}`}
      aria-selected={isActive}
      aria-controls={ariaControls}
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
