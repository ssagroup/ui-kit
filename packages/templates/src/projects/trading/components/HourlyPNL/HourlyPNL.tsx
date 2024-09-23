import { useTranslation } from 'react-i18next';
import { ClassNames, useTheme } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { HourlyPNLProps, ProgressPointProps } from './types';
import { ProgressPoint } from './ProgressPoint';
import * as S from './styles';
import { WithWidgetLoader } from '..';
import { WidgetCard } from '../WidgetCard';
import { WidgetInfoLabel } from '../WidgetInfoLabel';

export const HourlyPNL = ({
  isIncreasing,
  last = 0,
  currency,
  average = 0,
  min = 0,
  max = 0,
  isBotDashboard,
}: HourlyPNLProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const gridArea = isBotDashboard ? 'auto / hourly / auto / bots' : 'hourly';
  const progressValues: Array<ProgressPointProps> = [
    {
      title: t('hourlyPNL.minimum'),
      color: 'pink',
      align: 'start',
      value: min,
    },
    {
      title: t('hourlyPNL.average'),
      color: 'grey',
      value: average,
    },
    {
      title: t('hourlyPNL.maximum'),
      color: 'greenLighter',
      align: 'end',
      value: max,
    },
  ];
  return (
    <ClassNames>
      {({ css }) => (
        <WidgetCard
          title={t('hourlyPNL.title')}
          css={{
            gridArea,
            maxWidth: '100%',
          }}
          contentClassName={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'normal',
            justifyContent: 'space-around',
            maxWidth: '100%',
            height: '100%',
          })}>
          <WidgetInfoLabel
            title={t('hourlyPNL.labelTitle')}
            value={
              <Typography
                variant="body1"
                css={{
                  fontSize: 14,
                  overflowWrap: 'anywhere',
                  lineHeight: '16px',
                  [theme.mediaQueries.md]: { fontSize: 20 },
                }}
                weight="bold">
                {last}
              </Typography>
            }
            currency={currency}
            isIncreasing={isIncreasing}
          />
          <div css={S.ProgressPointWrapper}>
            {progressValues.map((progressItem, index) => {
              return (
                <ProgressPoint
                  key={index}
                  {...progressItem}
                  currency={currency}
                />
              );
            })}
          </div>
        </WidgetCard>
      )}
    </ClassNames>
  );
};

export const HourlyPNLWithLoader = ({
  isFetching,
  ...props
}: HourlyPNLProps & { isFetching: boolean }) => {
  const gridArea = props.isBotDashboard
    ? 'auto / hourly / auto / bots'
    : 'hourly';
  return (
    <WithWidgetLoader
      title={'hourlyPNL.title'}
      css={{ gridArea }}
      isFetching={isFetching}>
      <HourlyPNL {...props} />
    </WithWidgetLoader>
  );
};
