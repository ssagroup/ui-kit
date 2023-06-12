import ProgressBar from '@components/ProgressBar';
import Icon from '@components/Icon';
import Typography from '@components/Typography';

import { TooltipContentBase } from './TooltipContentBase';
import { IProgressChartTooltipProps } from './types';
import { mapSizes } from './utils';

export const ProgressChartTooltip = ({
  caption,
  value,
  valueFormatted,
  iconName,
  barProps = {},
}: IProgressChartTooltipProps) => {
  const { color } = barProps;

  return (
    <TooltipContentBase
      css={[mapSizes.small, { padding: '12px', width: '112px' }]}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          lineHeight: '1rem',
          marginBottom: '6px',
        }}>
        <Typography variant="body2" weight="medium">
          {caption}
        </Typography>
        <Typography
          variant="body3"
          weight="lighter"
          css={{
            display: 'flex',
            alignItems: 'center',
          }}>
          {valueFormatted}
          {iconName && <Icon name={iconName} size={8} noFallback />}
        </Typography>
      </div>

      <ProgressBar percentage={value} color={color} bgColor={'#fff'} size={6} />
    </TooltipContentBase>
  );
};
