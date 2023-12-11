import { css, useTheme } from '@emotion/react';
import { Wrapper, Icon, IMapIcons } from '@ssa-ui-kit/core';

export const TriggerIcon = ({
  iconName,
  iconSize,
  className,
}: {
  iconName: keyof IMapIcons;
  iconSize?: number;
  className?: string;
}) => {
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
      <Icon
        name={iconName}
        color={theme.colors.grey}
        size={iconSize}
        className={className}
      />
    </Wrapper>
  );
};
