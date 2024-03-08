import { css, useTheme } from '@emotion/react';
import { Wrapper, Icon } from '@ssa-ui-kit/core';
import { TriggerIconProps } from './types';

type IconName = Parameters<typeof Icon>[0]['name'];

export const TriggerIcon = ({
  iconName,
  iconSize,
  className,
  CustomIcon,
}: TriggerIconProps) => {
  const theme = useTheme();
  return (
    <Wrapper
      css={css`
        width: auto;
        min-width: 22px;
        justify-content: center;
        overflow: visible;
        position: relative;
        height: 26px;
      `}
      className="trigger-icon">
      {CustomIcon ? (
        <CustomIcon
          size={iconSize}
          className={className}
          color={theme.colors.grey}
        />
      ) : (
        <Icon
          name={iconName as IconName}
          color={theme.colors.grey}
          size={iconSize}
          className={className}
        />
      )}
    </Wrapper>
  );
};
