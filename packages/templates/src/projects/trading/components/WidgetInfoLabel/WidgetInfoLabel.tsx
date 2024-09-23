import { useTheme } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { WidgetInfoLabelProps } from './types';
import { GrowthIndexIcon } from '../GrowthIndexIcon';
import { WidgetInfoLabelBase } from './WidgetInfoLabelBase';

export const WidgetInfoLabel = ({
  title,
  value,
  currency,
  isIncreasing,
  titleCSS,
  valueCSS,
  ...props
}: WidgetInfoLabelProps) => {
  const theme = useTheme();
  return (
    <WidgetInfoLabelBase {...props}>
      <Typography
        variant="subtitle"
        weight="lighter"
        css={[
          {
            fontSize: 10,
            [theme.mediaQueries.md]: { fontSize: 14 },
          },
          titleCSS,
        ]}>
        {title}
      </Typography>
      <Typography
        variant="subtitle"
        css={[
          {
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            fontSize: 10,
            overflow: 'hidden',
            whiteSpace: 'nowrap',

            [theme.mediaQueries.md]: {
              justifyContent: 'flex-end',
              minWidth: 80,
              textAlign: 'right',
              fontSize: 'inherit',
            },
          },
          valueCSS,
        ]}>
        {value}
        {currency && currency}
        <GrowthIndexIcon isIncreasing={isIncreasing} size={13} />
      </Typography>
    </WidgetInfoLabelBase>
  );
};
