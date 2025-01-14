import { pathOr } from '@ssa-ui-kit/utils';
import { getExtendedInfo } from '@fintech/utils/charts';
import { GraphStatisticsWeighted, WeightedPriceItem } from '@fintech/types';

export const useChartInfo = ({
  dataOriginal,
}: {
  dataOriginal: GraphStatisticsWeighted['weightedPriceData'];
}) => {
  const baseAssetMarketPriceList: Array<number | null> = [];
  const baseAssetWeightedMeanPriceList: Array<number | null> = [];
  const quoteCoinCountList: Array<number | null> = [];
  const baseCoinPriceList: Array<number | null> = [];
  const baseCoinCountList: Array<number | null> = [];
  const coinSumList: Array<number> = [];

  dataOriginal.data.forEach((item) => {
    const baseAssetMarketPriceCurrent = pathOr<
      WeightedPriceItem,
      number | null
    >(null, ['weightedPrice', 'baseAssetMarketPrice'])(item);
    baseAssetMarketPriceList.push(baseAssetMarketPriceCurrent);

    const baseAssetWeightedMeanPriceCurrent = pathOr<
      WeightedPriceItem,
      number | null
    >(null, ['weightedPrice', 'baseAssetWeightedMeanPrice'])(item);
    baseAssetWeightedMeanPriceList.push(baseAssetWeightedMeanPriceCurrent);

    const quoteCoinCountCurrent = pathOr<WeightedPriceItem, number | null>(
      null,
      ['weightedPrice', 'quoteCoinCount'],
    )(item);
    quoteCoinCountList.push(quoteCoinCountCurrent);

    const baseCoinPriceCurrent = pathOr<WeightedPriceItem, number | null>(
      null,
      ['weightedPrice', 'baseCoinPrice'],
    )(item);
    baseCoinPriceList.push(baseCoinPriceCurrent);

    baseCoinCountList.push(
      pathOr<WeightedPriceItem, number | null>(null, [
        'weightedPrice',
        'baseCoinCount',
      ])(item),
    );

    if (quoteCoinCountCurrent !== null && baseCoinPriceCurrent !== null) {
      coinSumList.push(quoteCoinCountCurrent + baseCoinPriceCurrent);
    }
  });

  const coinSumMax = Math.max(...coinSumList);

  const baseAssetMarketPrice = getExtendedInfo(baseAssetMarketPriceList);
  const baseAssetWeightedMeanPrice = getExtendedInfo(
    baseAssetWeightedMeanPriceList,
  );
  const quoteCoinCount = getExtendedInfo(quoteCoinCountList);
  const baseCoinPrice = getExtendedInfo(baseCoinPriceList);
  const baseCoinCount = getExtendedInfo(baseCoinCountList);

  const noData = baseCoinPriceList.map((item) =>
    item === null ? coinSumMax : null,
  );

  return {
    baseAssetMarketPrice,
    baseAssetWeightedMeanPrice,
    quoteCoinCount,
    baseCoinPrice,
    baseCoinCount,
    noData,
  };
};
