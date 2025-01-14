import { useMemo } from 'react';
import { ClassNames, useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import { WidgetCard, WithWidgetLoader } from '@fintech/components';
import { BotsCount } from './BotsCount';
import { AllBotsBlock } from './AllBotsBlock';
import { BotsCountContent } from './BotsCountContent';
import { BotsProps } from './types';

export const Bots = ({ all, running }: BotsProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return useMemo(
    () => (
      <ClassNames>
        {({ css }) => (
          <WidgetCard
            title={t('bots.title')}
            wrapperClassName={css({
              gridArea: 'bots',
            })}
            headerClassName={css({
              marginBottom: 0,
              [theme.mediaQueries.md]: {
                marginBottom: '10px',
              },
            })}
            contentClassName={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              maxWidth: '100%',
              height: '100%',
              color: theme.colors.greyDarker,
            })}>
            <BotsCount
              max={all}
              currentValue={running}
              infoContent={<BotsCountContent running={running} />}
            />
            <AllBotsBlock all={all} theme={theme} />
          </WidgetCard>
        )}
      </ClassNames>
    ),
    [all, running],
  );
};

export const BotsWithLoader = ({
  isFetching,
  ...props
}: BotsProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'bots.title'}
    css={{ gridArea: 'bots' }}
    isFetching={isFetching}>
    <Bots {...props} />
  </WithWidgetLoader>
);
