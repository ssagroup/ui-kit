import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ClassNames, useTheme } from '@emotion/react';
import { Wrapper } from '@ssa-ui-kit/core';
import { propOr } from '@ssa-ui-kit/utils';
import { PLATFORM_ICONS } from '@trading/icons';
import { CURRENCY_ICONS } from '@trading/components/CryptocurrencyPrices/constants';
import * as S from '@trading/components/CryptocurrencyPrices/styles';
import { useInstrumentInfoWithPrices } from './hooks';
import { WeightedMeanPricesProps } from './types';
import { Header } from '../WidgetCard/Header';
import { Content } from '../WidgetCard/Content';
import { WidgetCard, WithWidgetLoader } from '..';

export const WeightedMeanPrices = ({
  gridArea,
  weightedMeanPrices,
  isBotPage,
}: WeightedMeanPricesProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const instrumentInfo = useInstrumentInfoWithPrices();
  const prices = [
    weightedMeanPrices.weightedAssetBuyPrice,
    weightedMeanPrices.weightedAssetSellPrice,
  ];
  const instrument = weightedMeanPrices.instrument;
  const baseQuote = instrument.split('/').map((name) => name.toLowerCase());
  const PlatformIcon = propOr(null, instrumentInfo.platform)(PLATFORM_ICONS);
  return (
    <ClassNames>
      {({ css }) => (
        <WidgetCard
          css={{
            gridArea: gridArea,
            '& > div > h3': {
              fontSize: 14,
              [theme.mediaQueries.lg]: {
                fontSize: 16,
              },
            },
          }}
          contentClassName={css([
            S.Content,
            {
              fontSize: 14,
              [theme.mediaQueries.md]: {
                fontSize: 16,
              },
            },
          ])}
          title={t('cryptocurrency-prices.title')}>
          <Fragment key={`cryptocurrency-price`}>
            <S.ItemsWrapper data-testid="currencies-wrapper">
              <Wrapper
                direction="row"
                css={{
                  justifyContent: 'flex-start',
                  gap: 5,
                  marginRight: 5,
                  [theme.mediaQueries.md]: {
                    gap: 10,
                    marginRight: 10,
                  },
                }}>
                <S.IconWrapper>
                  {PlatformIcon && <PlatformIcon className={S.Platform} />}
                </S.IconWrapper>
                <S.Price
                  isIncreasing={instrumentInfo.isIncreasing}
                  isBotPage={!!isBotPage}>
                  {instrumentInfo.price}
                </S.Price>
              </Wrapper>
              <S.Instrument direction="row" isBotPage={!!isBotPage}>
                {instrumentInfo.instrument}
              </S.Instrument>
            </S.ItemsWrapper>
            <S.WeightedItemsWrapper>
              <Header
                title={t('cryptocurrency-prices.weightedMeanPrice')}
                css={{
                  '& h3': {
                    fontSize: 14,
                  },
                  [theme.mediaQueries.lg]: {
                    '& h3': {
                      fontSize: 16,
                    },
                  },
                }}></Header>
              <Content
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: 8,
                  maxWidth: '100%',
                }}>
                {prices.map((weightedPrice, index) => {
                  const CurrencyIcon = propOr(
                    null,
                    baseQuote[index],
                  )(CURRENCY_ICONS);
                  return (
                    <Wrapper key={`weighed-price-${index}`}>
                      <Wrapper
                        direction="row"
                        css={{
                          justifyContent: 'flex-start',
                          gap: 5,
                          marginRight: 5,
                          alignContent: 'center',
                          [theme.mediaQueries.md]: {
                            gap: 10,
                            marginRight: 10,
                          },
                        }}>
                        <S.IconWrapper>
                          {CurrencyIcon && (
                            <CurrencyIcon className={S.Platform} />
                          )}
                        </S.IconWrapper>
                        <S.Price isIncreasing={null} isBotPage={!!isBotPage}>
                          {weightedPrice as unknown as React.ReactElement}
                        </S.Price>
                      </Wrapper>
                      <S.Instrument direction="row" isBotPage={!!isBotPage}>
                        {instrumentInfo.instrument}
                      </S.Instrument>
                    </Wrapper>
                  );
                })}
              </Content>
            </S.WeightedItemsWrapper>
          </Fragment>
        </WidgetCard>
      )}
    </ClassNames>
  );
};

export const WeightedMeanPricesWithLoader = ({
  isFetching,
  gridArea,
  ...props
}: WeightedMeanPricesProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'cryptocurrency-prices.title'}
    css={{ gridArea }}
    isFetching={isFetching}>
    <WeightedMeanPrices {...props} />
  </WithWidgetLoader>
);
