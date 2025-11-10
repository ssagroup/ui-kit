import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { ClassNames, useTheme } from '@emotion/react';
import { PLATFORM_ICONS } from '@fintech/icons';
import { useBotInfo } from '@fintech/pages/BotPage/hooks';
import { InstrumentsList } from '@fintech/types';

import { Wrapper } from '@ssa-ui-kit/core';

import { pathOr, propOr } from '@ssa-ui-kit/utils';

import { useTranslation } from '@contexts';

import { Content } from '../WidgetCard/Content';
import { Header } from '../WidgetCard/Header';

import { CURRENCY_ICONS } from './constants';
import * as S from './styles';

import { WidgetCard } from '..';

export const CryptocurrencyPrices = ({
  instrumentsList,
}: {
  instrumentsList: InstrumentsList;
}) => {
  const { t } = useTranslation();
  const { id: botId } = useParams();
  const theme = useTheme();
  const bot = useBotInfo();

  const instrument = pathOr<typeof bot, string>('', ['data', 'instrument'])(
    bot,
  );
  const baseQuote = instrument.split('/').map((name) => name.toLowerCase());

  const weightedAssetBuyPrice = pathOr('', ['data', 'weightedAssetBuyPrice'])(
    bot,
  );
  const weightedAssetSellPrice = pathOr('', ['data', 'weightedAssetSellPrice'])(
    bot,
  );
  const isBotPage = !!botId;
  return (
    <ClassNames>
      {({ css }) => (
        <WidgetCard
          css={{
            gridArea: 'cryptocurrency',
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
          {instrumentsList.map((instrumentInfo, index) => {
            const PlatformIcon = propOr(
              null,
              instrumentInfo.platform,
            )(PLATFORM_ICONS);
            return (
              <Fragment key={`cryptocurrency-price-${index}`}>
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
                      isBotPage={isBotPage}>
                      {instrumentInfo.price}
                    </S.Price>
                  </Wrapper>
                  <S.Instrument direction="row" isBotPage={isBotPage}>
                    {instrumentInfo.instrument}
                  </S.Instrument>
                </S.ItemsWrapper>
                {isBotPage && (
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
                      {[weightedAssetBuyPrice, weightedAssetSellPrice].map(
                        (weightedPrice, index) => {
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
                                <S.Price
                                  isIncreasing={null}
                                  isBotPage={isBotPage}>
                                  {weightedPrice as React.ReactElement}
                                </S.Price>
                              </Wrapper>
                              <S.Instrument
                                direction="row"
                                isBotPage={isBotPage}>
                                {instrumentInfo.instrument}
                              </S.Instrument>
                            </Wrapper>
                          );
                        },
                      )}
                    </Content>
                  </S.WeightedItemsWrapper>
                )}
              </Fragment>
            );
          })}
        </WidgetCard>
      )}
    </ClassNames>
  );
};
