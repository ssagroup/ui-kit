import { useEffect } from 'react';
import { pathOr } from '@ssa-ui-kit/utils';
import { GraphsListItem } from '@fintech/types';
import { useGraphs } from '@fintech/contexts';
import { useAppLayout } from '@fintech/pages/AppLayout/useAppLayoutContext';
import { getExtendedInfo } from '@fintech/utils/charts';

export const useChartInfo = ({
  dataOriginal,
}: {
  dataOriginal: GraphsListItem[];
}) => {
  const { tooltipRef } = useGraphs();
  const { isFullscreenMode } = useAppLayout();

  useEffect(() => {
    tooltipRef.current?.style.setProperty('display', 'none');
  }, [isFullscreenMode]);

  const botAccountBalanceList: Array<number | null> = [];
  const baseAssetPriceList: Array<number | null> = [];
  dataOriginal.forEach((item) => {
    botAccountBalanceList.push(
      pathOr<GraphsListItem, number | null>(null, [
        'balanceHistory',
        'botAccountBalance',
      ])(item),
    );
    baseAssetPriceList.push(
      pathOr<GraphsListItem, number | null>(null, [
        'balanceHistory',
        'baseAssetPrice',
      ])(item),
    );
  });

  const botAccountBalance = getExtendedInfo(botAccountBalanceList);
  const baseAssetPrice = getExtendedInfo(baseAssetPriceList);

  const noData = baseAssetPriceList.map((item) =>
    item === null ? baseAssetPrice.max : null,
  );

  return {
    baseAssetPrice,
    botAccountBalance,
    noData,
  };
};
