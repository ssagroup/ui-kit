import { useTranslation } from 'react-i18next';
import { ClassNames, useTheme } from '@emotion/react';
import { Wrapper } from '@ssa-ui-kit/core';
import { TurnoverRatioProps } from './types';
import { WithWidgetLoader } from '../WithWidgetLoader';
import { WidgetCard } from '../WidgetCard';

const TurnoverRatioItem = ({
  name,
  turnover,
  turnoverRatio,
}: {
  name: string;
  turnover: string;
  turnoverRatio: number;
}) => {
  return (
    <Wrapper>
      <Wrapper css={{ justifyContent: 'left' }}>{name}</Wrapper>
      <Wrapper css={{ justifyContent: 'center' }}>
        <b>{turnover}</b>
      </Wrapper>
      <Wrapper css={{ justifyContent: 'right' }}>
        <b>{`x${turnoverRatio}`}</b>
      </Wrapper>
    </Wrapper>
  );
};

export const TurnoverRatio = ({
  data,
  className,
  ...props
}: TurnoverRatioProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <ClassNames>
      {({ css }) => (
        <WidgetCard
          className={className}
          title={t('turnoverRatio.title')}
          contentClassName={css({
            display: 'flex',
            justifyContent: 'space-between',
            gap: '5px',
            height: '100%',
            [theme.mediaQueries.md]: {
              maxWidth: 'initial',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 'initial',
            },
          })}
          headerClassName={css({
            marginBottom: '5px',
            [theme.mediaQueries.md]: {
              marginBottom: '10px',
            },
          })}
          {...props}>
          <Wrapper
            direction="column"
            css={{
              width: '100%',
              height: '100%',
              padding: '20px 0',
              rowGap: 15,
              justifyContent: 'start',
            }}>
            <TurnoverRatioItem
              name={t('turnoverRatio.total')}
              turnover={data.totalTurnover}
              turnoverRatio={data.totalTurnoverRatio}
            />
            <TurnoverRatioItem
              name={t('turnoverRatio.maker')}
              turnover={data.makerTurnover}
              turnoverRatio={data.makerTurnoverRatio}
            />
          </Wrapper>
        </WidgetCard>
      )}
    </ClassNames>
  );
};

export const TurnoverRatioWithLoader = ({
  isFetching,
  ...props
}: TurnoverRatioProps & { isFetching: boolean }) => {
  const { t } = useTranslation();
  return (
    <WithWidgetLoader
      title={t('turnoverRatio.title')}
      css={{ gridArea: 'turnover-ratio' }}
      isFetching={isFetching}>
      <TurnoverRatio {...props} />
    </WithWidgetLoader>
  );
};
