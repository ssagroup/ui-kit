import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { TradingInfoCard, TradingScoreboard } from '@ssa-ui-kit/widgets';
import { propOr } from '@ssa-ui-kit/utils';

import { PERIOD_DAY } from '@trading/constants';
import { Bot, BotStatistics, Statistics, RequestPeriod } from '@trading/types';
import {
  BalanceWithLoader,
  MaxInWorkWithLoader,
  PositionsWithLoader,
  ProfitabilityWithLoader,
  HourlyPNLWithLoader,
  MarketRolesWithLoader,
  OrdersWithLoader,
  PNLWithLoader,
  TurnoverWithLoader,
  CumulativePNLWithLoader,
  RebalanceWithLoader,
  WeightedMeanPricesWithLoader,
  TurnoverRatioWithLoader,
  CurrentFundsWithLoader,
  KeeperRunsWithLoader,
} from '@trading/components';
import { useGraphs } from '@trading/contexts';
import {
  PNL,
  ROI,
} from '@trading/pages/BotPage/components/InformationTab/components';
import {
  PeriodFilter,
  TopMenuWrapper,
  DashboardLayout,
  BotsWithLoader,
} from './components';
import { useStatistics, useGraphStatistic } from './hooks';
import * as S from './styles';

export const TradingDashboard = () => {
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

  const fundsInNoControls = propOr<Statistics, Statistics['fundsInNoControls']>(
    {},
    'fundsInNoControls',
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

  const turnoverRatio = propOr<Statistics, Statistics['turnoverRatio']>(
    {},
    'turnoverRatio',
  )(common);

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
        <TurnoverRatioWithLoader
          key="turnoverRatio"
          data={turnoverRatio}
          isFetching={isStatLoading}
        />
        <CurrentFundsWithLoader
          styles={css({ gridArea: 'funds-no-control' })}
          title="fundsInNoControls.title"
          longFunds={fundsInNoControls.longFunds}
          longFundsPercents={fundsInNoControls.longFundsPercents}
          shortFunds={fundsInNoControls.shortFunds}
          shortFundsPercents={fundsInNoControls.shortFundsPercents}
          isAdditionalRightBar
          key="fundsNoControl"
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
        />
        <WeightedMeanPricesWithLoader
          key="weighted-mean-prices-eth"
          gridArea="weighted-mean-prices-eth"
          weightedMeanPrices={weightedMeanPricesEth}
          isFetching={isStatLoading}
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
