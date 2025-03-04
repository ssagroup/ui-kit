import { propOr } from '@ssa-ui-kit/utils';
import {
  BalanceDataForGraph,
  SegmentedDataItem,
  SegmentedPieChartProps,
} from '../types';
import { defaultPieChartColors } from '../colorPalettes';

import { useFullscreenMode } from '@components/FullscreenModeContext';

export const useData = ({
  data,
  pieChartColors = defaultPieChartColors,
  legendValueRoundingDigits,
  legendBackgrounds,
}: Pick<
  SegmentedPieChartProps,
  'data' | 'pieChartColors' | 'legendValueRoundingDigits' | 'legendBackgrounds'
>) => {
  const { isFullscreenMode } = useFullscreenMode();

  const safeData = Array.isArray(data) ? data : [];
  const safeColors = Array.isArray(pieChartColors) ? pieChartColors : [[]];

  const totalAmount = safeData.reduce(
    (acc, item) => acc + Number(item.value),
    0,
  );

  const getRoundingDigits = (item: SegmentedDataItem) =>
    propOr<SegmentedDataItem, number>(
      legendValueRoundingDigits,
      'legendValueRoundingDigits',
    )(item);

  const balanceDataForTheGraph: BalanceDataForGraph[] = [];
  const balanceDataForTheLegend: BalanceDataForGraph[] = [];
  safeData.forEach((item, itemIndex) => {
    const mainValue = Number(item.value);
    const mainPercentage = totalAmount ? (mainValue * 100) / totalAmount : 0;

    const mainSlice: BalanceDataForGraph = {
      value: mainValue,
      label: item.label,
      percentage: mainPercentage,
      mainId: Number(item.id),
      mainValue,
      legendLabel: item.legendLabel,
      legendValue: item.legendValue,
      legendValueRoundingDigits: getRoundingDigits(item),
      color: safeColors?.[itemIndex]?.[0],
      id: `${itemIndex}0`,
    };
    const partedSlices: BalanceDataForGraph[] = (item.parts || [])
      .filter((part) => !!part.value)
      .map((part, partIndex) => {
        const partValue = Number(part.value);
        const partPercentage = totalAmount
          ? (partValue * 100) / totalAmount
          : 0;

        return {
          value: partValue,
          label: `${item.label}, ${part.label}`,
          percentage: partPercentage,
          mainId: Number(item.id),
          mainValue: Number(item.value),
          legendLabel: item.legendLabel,
          legendValue: part.legendValue,
          legendValueRoundingDigits: getRoundingDigits(item),
          color: safeColors?.[itemIndex]?.[partIndex],
          id: `${itemIndex}${partIndex}`,
          partIndex,
          partLabel: part.label,
          partPercentage,
          partValue,
          partLegendValue: part.legendValue,
        };
      });

    if (partedSlices.length) {
      balanceDataForTheGraph.push(...partedSlices);
    } else {
      balanceDataForTheGraph.push(mainSlice);
    }

    if (isFullscreenMode && partedSlices.length) {
      balanceDataForTheLegend.push(...partedSlices);
    } else {
      balanceDataForTheLegend.push(mainSlice);
    }
  });

  let legendColors: string[];
  if (isFullscreenMode) {
    legendColors = balanceDataForTheLegend.map((item) => item.color);
  } else {
    legendColors = legendBackgrounds || [];
  }

  return {
    balanceDataForTheGraph,
    balanceDataForTheLegend,
    legendColors,
  };
};
