import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import {
  BalanceWithLoader,
  CumulativePNLWithLoader,
  CurrentFundsWithLoader,
  HourlyPNLWithLoader,
  KeeperRunsWithLoader,
  MarketRolesWithLoader,
  MaxInWorkWithLoader,
  OrdersWithLoader,
  PNLWithLoader,
  PositionsWithLoader,
  ProfitabilityWithLoader,
  RebalanceWithLoader,
  TurnoverWithLoader,
  WeightedMeanPricesWithLoader,
} from '@fintech/components';
import { PERIOD_DAY } from '@fintech/constants';
import { useGraphs } from '@fintech/contexts';
import {
  PNL,
  ROI,
} from '@fintech/pages/BotPage/components/InformationTab/components';
import { Bot, BotStatistics, RequestPeriod, Statistics } from '@fintech/types';

import { propOr } from '@ssa-ui-kit/utils';

import { TradingInfoCard, TradingScoreboard } from '@ssa-ui-kit/widgets';

import { useTranslation } from '@contexts';

import {
  BotsWithLoader,
  DashboardLayout,
  PeriodFilter,
  TopMenuWrapper,
} from './components';
import { useGraphStatistic, useStatistics } from './hooks';
import * as S from './styles';

export const FinTechDashboard = () => {
  const [period, setPeriod] = useState<RequestPeriod>({ period: PERIOD_DAY });

  const { data: graphsData, isFetching: isGraphStatLoading } =
    useGraphStatistic({ period });

  const { calculateMargins } = useGraphs();

  const { t } = useTranslation();

  useEffect(() => {
    calculateMargins(graphsData);
  }, [graphsData]);

  const {
    data: common,
    items: scoreboard,
    isFetching: isStatLoading,
  } = useStatistics({ period });

  const roiTradingTranslation = t(
    'pages.bot.tabs.information.table.roiTrading',
  );
  const roiInvestmentTranslation = t(
    'pages.bot.tabs.information.table.roiInvestment',
  );
  const roiTotalTranslation = t('pages.bot.tabs.information.table.roiTotal');

  const pnlTradingTranslation = t(
    'pages.bot.tabs.information.table.pnlTrading',
  );
  const pnlInvestmentTranslation = t(
    'pages.bot.tabs.information.table.pnlInvestment',
  );
  const pnlTotalTranslation = t('pages.bot.tabs.information.table.pnlTotal');

  const marketRolesStatistic = propOr<
    Statistics,
    Statistics['marketRolesStatistic']
  >(
    {},
    'marketRolesStatistic',
  )(common);

  const balance = propOr<Statistics, Statistics['balance']>(
    {},
    'balance',
  )(common);

  const fundsInPlacedOrders = propOr<
    Statistics,
    Statistics['fundsInPlacedOrders']
  >(
    {},
    'fundsInPlacedOrders',
  )(common);

  const weightedMeanPrices = propOr<
    Statistics,
    Statistics['weightedMeanPrices']
  >(
    [],
    'weightedMeanPrices',
  )(common);
  const weightedMeanPricesBtc = weightedMeanPrices.find(
    (x) => x.instrument === 'BTC/FDUSD' && x.platform === 'Binance',
  ) || {
    instrument: 'BTC/FDUSD',
    platform: 'Binance',
  };
  const weightedMeanPricesEth = weightedMeanPrices.find(
    (x) => x.instrument === 'ETH/FDUSD' && x.platform === 'Binance',
  ) || {
    instrument: 'ETH/FDUSD',
    platform: 'Binance',
  };

  return (
    <DashboardLayout>
      <TopMenuWrapper>
        <TradingScoreboard
          items={scoreboard}
          renderCard={(item, onClick) => {
            switch (item.title) {
              case pnlTradingTranslation: {
                return (
                  <PNL
                    bot={
                      {
                        statistics: {
                          pnl: item.value as number,
                        } as BotStatistics,
                      } as Bot
                    }
                    title={item.title}
                    value={item.value}
                    propertyName={'pnl'}
                    propertyUpName={'pnlUp'}
                    showArrow={false}
                  />
                );
              }
              case pnlInvestmentTranslation: {
                return (
                  <PNL
                    bot={
                      {
                        statistics: {
                          pnlInvestment: item.value as number,
                        } as BotStatistics,
                      } as Bot
                    }
                    title={item.title}
                    value={item.value}
                    propertyName={'pnlInvestment'}
                    propertyUpName={'pnlInvestmentUp'}
                    showArrow={false}
                  />
                );
              }
              case pnlTotalTranslation: {
                return (
                  <PNL
                    bot={
                      {
                        statistics: {
                          pnlTotal: item.value as number,
                        } as BotStatistics,
                      } as Bot
                    }
                    title={item.title}
                    value={item.value}
                    propertyName={'pnlTotal'}
                    propertyUpName={'pnlTotalUp'}
                    showArrow={false}
                  />
                );
              }
              case roiTradingTranslation: {
                return (
                  <ROI
                    bot={
                      {
                        statistics: {
                          roi: item.value as number,
                        } as BotStatistics,
                      } as Bot
                    }
                    title={item.title}
                    value={item.value}
                    propertyName={'roi'}
                    showArrow={false}
                  />
                );
              }
              case roiInvestmentTranslation: {
                return (
                  <ROI
                    bot={
                      {
                        statistics: {
                          roiInvestment: item.value as number,
                        } as BotStatistics,
                      } as Bot
                    }
                    title={item.title}
                    value={item.value}
                    propertyName={'roiInvestment'}
                    showArrow={false}
                  />
                );
              }
              case roiTotalTranslation: {
                return (
                  <ROI
                    bot={
                      {
                        statistics: {
                          roiTotal: item.value as number,
                        } as BotStatistics,
                      } as Bot
                    }
                    title={item.title}
                    value={item.value}
                    propertyName={'roiTotal'}
                    showArrow={false}
                  />
                );
              }
              default:
                return (
                  <TradingInfoCard
                    value={item.value}
                    unit={item.unit}
                    title={item.title}
                    icon={item.icon}
                    link={item.link}
                    onClick={() => {
                      if (typeof onClick === 'function') {
                        onClick(item);
                      }
                    }}
                  />
                );
            }
          }}
          itemsPerRow={6}
          onClick={() => {
            /**
             * It was decided to skip clicks handling / redirects temporarily.
             * */
          }}
          css={css`
            grid-template-columns: repeat(3, 1fr);
            grid-auto-flow: inherit;
            overflow: inherit;
            gap: 4px;
          `}
        />
        <PeriodFilter onClick={setPeriod} period={period} />
      </TopMenuWrapper>
      <S.WidgetLayoutDashboard>
        <BalanceWithLoader
          balance={balance}
          key="balance"
          isFetching={isStatLoading}
        />
        <MaxInWorkWithLoader
          amount={common.maxInWork.maxInWork}
          percent={common.maxInWork.maxInWorkPercents}
          currency={balance.balanceTo}
          key="maxInWork"
          isFetching={isStatLoading}
        />
        <CurrentFundsWithLoader
          styles={css({ gridArea: 'funds-place-order' })}
          title="fundsInPlacedOrders.title"
          longFunds={fundsInPlacedOrders.longFunds}
          longFundsPercents={fundsInPlacedOrders.longFundsPercents}
          shortFunds={fundsInPlacedOrders.shortFunds}
          shortFundsPercents={fundsInPlacedOrders.shortFundsPercents}
          isAdditionalRightBar
          key="fundsPlaceOrder"
          isFetching={isStatLoading}
        />
        <HourlyPNLWithLoader
          currency={balance.balanceTo}
          isIncreasing={common.pnlUp}
          last={common.hourlyPnlStatistic.last}
          average={common.hourlyPnlStatistic.average}
          min={common.hourlyPnlStatistic.minimum}
          max={common.hourlyPnlStatistic.maximum}
          key="hourlyPNL"
          isFetching={isStatLoading}
        />
        <BotsWithLoader
          all={common.allBotsCount}
          running={common.runningBotsCount}
          key="bots"
          isFetching={isStatLoading}
        />
        <WeightedMeanPricesWithLoader
          key="weighted-mean-prices-btc"
          gridArea="weighted-mean-prices-btc"
          weightedMeanPrices={weightedMeanPricesBtc}
          isFetching={isStatLoading}
          isBotPage={false}
        />
        <WeightedMeanPricesWithLoader
          key="weighted-mean-prices-eth"
          gridArea="weighted-mean-prices-eth"
          weightedMeanPrices={weightedMeanPricesEth}
          isFetching={isStatLoading}
          isBotPage={false}
        />
        <OrdersWithLoader
          data={graphsData}
          currency={balance.balanceTo}
          period={period}
          key="orders"
          isFetching={isStatLoading && isGraphStatLoading}
        />
        <PNLWithLoader
          data={graphsData}
          currency={balance.balanceTo}
          period={period}
          key="pnl"
          isFetching={isStatLoading && isGraphStatLoading}
        />
        <TurnoverWithLoader
          data={graphsData}
          currency={balance.balanceTo}
          period={period}
          key="turnover"
          isFetching={isStatLoading && isGraphStatLoading}
        />
        <CumulativePNLWithLoader
          data={graphsData}
          currency={balance.balanceTo}
          period={period}
          key="cumulativePNL"
          isFetching={isStatLoading && isGraphStatLoading}
        />
        <RebalanceWithLoader
          data={graphsData}
          currency={balance.balanceTo}
          period={period}
          isFetching={isGraphStatLoading}
        />
        <PositionsWithLoader
          profitPositions={common.positions.profitPositions}
          profitPositionsPercent={common.positions.profitPositionsPercent}
          lossPositions={common.positions.lossPositions}
          lossPositionsPercents={common.positions.lossPositionsPercents}
          key="positions"
          isFetching={isStatLoading}
        />
        <ProfitabilityWithLoader
          profit={common.profitabilityStatistic.profit}
          profitPercents={common.profitabilityStatistic.profitPercents}
          loss={common.profitabilityStatistic.loss}
          lossPercents={common.profitabilityStatistic.lossPercents}
          currency={balance.balanceTo}
          key="profitability"
          isFetching={isStatLoading}
        />
        <MarketRolesWithLoader
          roleMaker={marketRolesStatistic.roleMaker}
          roleMakerPercents={marketRolesStatistic.roleMakerPercents}
          roleTaker={marketRolesStatistic.roleTaker}
          roleTakerPercents={marketRolesStatistic.roleTakerPercents}
          roleMakerCost={marketRolesStatistic.roleMakerCost}
          roleMakerCostPercents={marketRolesStatistic.roleMakerCostPercents}
          roleTakerCost={marketRolesStatistic.roleTakerCost}
          roleTakerCostPercents={marketRolesStatistic.roleTakerCostPercents}
          key="marketRoles"
          isFetching={isStatLoading}
        />
        <KeeperRunsWithLoader
          data={graphsData}
          period={period}
          key="keeperRuns"
          isFetching={isGraphStatLoading}
        />
      </S.WidgetLayoutDashboard>
    </DashboardLayout>
  );
};
