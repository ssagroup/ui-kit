import { css, useTheme } from '@emotion/react';
import { Wrapper, Icon, IMapIcons } from '@ssa-ui-kit/core';
import * as S from './styles';

export const TriggerIcon = ({
  iconName,
  className,
}: {
  iconName: keyof IMapIcons;
  className?: string;
}) => {
  const theme = useTheme();
  return (
    <Wrapper
      css={css`
        width: 24px;
        height: 24px;
        &:hover {
          ${S.SVGHoverShadow(theme)}
        }
      `}
      className="trigger-icon">
      <Icon
        name={iconName}
        color={theme.colors.grey}
        css={{ marginRight: 20 }}
        className={className}
      />
    </Wrapper>
  );
};
