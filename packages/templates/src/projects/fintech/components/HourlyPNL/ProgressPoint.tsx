import { useTheme } from '@emotion/react';

import { Typography } from '@ssa-ui-kit/core';

import * as S from './styles';
import { ProgressPointProps } from './types';

export const ProgressPoint = ({
  title,
  align,
  color,
  value,
  currency,
}: ProgressPointProps) => {
  const theme = useTheme();
  return (
    <div
      css={[
        S.ProgressPointItem,
        {
          alignItems: align ? `flex-${align}` : 'center',
          textAlign: align ? align : 'center',
        },
      ]}>
      <Typography
        variant="subtitle"
        css={S.ProgressPointTitle}
        color={theme.colors.greyDarker60}>
        {title}
      </Typography>
      <div css={[S.ProgressPointCircle, { background: theme.colors[color] }]} />
      <Typography variant="h6" weight="bold" css={S.ProgressPointValues}>
        {value} <span>{currency}</span>
      </Typography>
    </div>
  );
};
