import { css, useTheme } from '@emotion/react';
import { Wrapper, Icon, IMapIcons } from '@ssa-ui-kit/core';
import * as S from './styles';

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
        width: 24px;
        height: 24px;
        justify-content: center;
      `}
      className="trigger-icon">
      <Icon
        name={iconName}
        color={theme.colors.grey}
        css={{ marginRight: 20 }}
        size={iconSize}
        className={className}
      />
    </Wrapper>
  );
};
