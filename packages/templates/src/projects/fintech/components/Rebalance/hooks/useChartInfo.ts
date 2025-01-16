import { useEffect, useState } from 'react';
import { pathOr, propOr } from '@ssa-ui-kit/utils';
import { GraphsListItem, RebalancingItemKeys } from '@fintech/types';
import { useBarGroupGap } from '@fintech/hooks';
import { useCurrency, useGraphs } from '@fintech/contexts';
import { DECIMAL_PLACES_BY_CURRENCY_LONG } from '@fintech/constants';
import { useAppLayout } from '@fintech/pages/AppLayout/useAppLayoutContext';
import { getExtendedInfo } from '@fintech/utils/charts';
import { ExtendedInfoData } from '../types';

export const useChartInfo = ({
  dataOriginal,
}: {
  dataOriginal: GraphsListItem[];
}) => {
  const { tooltipRef } = useGraphs();
  const { isFullscreenMode } = useAppLayout();
  const { currency } = useCurrency();
  const barGroupGap = useBarGroupGap(dataOriginal);

  const getRebalanceData = () => {
    return dataOriginal.map((item) => ({
      timestamp: item.timestamp,
      ...item.rebalancing,
      sold: -item.rebalancing.sold,
    }));
  };

  const getExtendedInfoData = () => {
    const decimalPlacesLength = propOr<Record<string, number>, number>(
      DECIMAL_PLACES_BY_CURRENCY_LONG['DEFAULT'],
      currency,
    )(DECIMAL_PLACES_BY_CURRENCY_LONG);

    const graphData: {
      [key in RebalancingItemKeys]: Array<number>;
    } = {
      sold: [],
      bought: [],
      sellOrders: [],
      buyOrders: [],
    };

    dataOriginal.forEach((item) => {
      Object.keys(graphData).forEach((dataKey) => {
        let currentValue = pathOr<GraphsListItem, number>(0, [
          'rebalancing',
          dataKey,
        ])(item);
        currentValue = Number(currentValue.toFixed(decimalPlacesLength));
        graphData[dataKey as RebalancingItemKeys].push(
          dataKey === 'sold' ? -currentValue : currentValue,
        );
      });
    });

    const extendedInfoData: ExtendedInfoData = {} as ExtendedInfoData;

    Object.keys(graphData).forEach((dataKey) => {
      extendedInfoData[dataKey as RebalancingItemKeys] = getExtendedInfo(
        graphData[dataKey as RebalancingItemKeys],
      );
    });

    return extendedInfoData;
  };

  const [extendedInfoData, setExtendedInfoData] = useState<
    ReturnType<typeof getExtendedInfoData>
  >(() => getExtendedInfoData());
  const [rebalanceData, setRebalanceData] = useState<
    ReturnType<typeof getRebalanceData>
  >(() => getRebalanceData());

  useEffect(() => {
    tooltipRef.current?.style.setProperty('display', 'none');
  }, [isFullscreenMode]);

  useEffect(() => {
    setExtendedInfoData(getExtendedInfoData());
  }, [dataOriginal, currency]);

  useEffect(() => {
    setRebalanceData(getRebalanceData());
  }, [dataOriginal]);

  return {
    bought: extendedInfoData.bought,
    sold: extendedInfoData.sold,
    bargroupgap: barGroupGap,
    rebalanceData,
  };
};
