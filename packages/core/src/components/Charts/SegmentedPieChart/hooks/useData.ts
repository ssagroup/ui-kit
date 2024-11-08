import { propOr } from '@ssa-ui-kit/utils';
import {
  BalanceDataForGraph,
  SegmentedDataItem,
  SegmentedPieChartProps,
} from '../types';
import { defaultPieChartColors } from '../colorPalettes';

export const useData = ({
  data,
  pieChartColors = defaultPieChartColors,
  legendValueRoundingDigits,
}: Pick<
  SegmentedPieChartProps,
  'data' | 'pieChartColors' | 'legendValueRoundingDigits'
>) => {
  let calculatedTotalAmount = 0;
  const dataLocal = Array.isArray(data) ? data : [];
  const pieChartColorsLocal = Array.isArray(pieChartColors)
    ? pieChartColors
    : [[]];
  dataLocal?.forEach((item) => {
    calculatedTotalAmount += Number(item.value);
  });
  const balanceDataForTheGraph: BalanceDataForGraph[] = [];
  const balanceDataForTheLegend: BalanceDataForGraph[] = [];
  dataLocal?.forEach((item, itemIndex) => {
    const mainPercentage = (Number(item.value) * 100) / calculatedTotalAmount;
    const newMainItem = {
      value: item.value,
      label: item.label,
      percentage: mainPercentage,
      mainId: Number(item.id),
      mainValue: item.value,
      legendLabel: item.legendLabel,
      legendValue: item.legendValue,
      legendValueRoundingDigits: propOr<SegmentedDataItem, number>(
        legendValueRoundingDigits,
        'legendValueRoundingDigits',
      )(item),
      color: pieChartColorsLocal?.[itemIndex]?.[0],
      id: `${itemIndex}0`,
    };
    balanceDataForTheLegend.push(newMainItem);
    if (item.parts?.length) {
      item.parts
        ?.filter((part) => !!part.value)
        .forEach((part, partIndex) => {
          const partPercentage = (part.value * 100) / calculatedTotalAmount;
          balanceDataForTheGraph.push({
            value: part.value,
            label: item.label,
            percentage: mainPercentage,
            mainId: Number(item.id),
            mainValue: item.value,
            legendLabel: item.legendLabel,
            legendValue: item.legendValue,
            legendValueRoundingDigits: propOr<SegmentedDataItem, number>(
              legendValueRoundingDigits,
              'legendValueRoundingDigits',
            )(item),
            color: pieChartColorsLocal?.[itemIndex]?.[partIndex],
            id: `${itemIndex}${partIndex}`,
            partIndex,
            partLabel: part.label,
            partPercentage: Number(partPercentage),
            partValue: part.value,
            partLegendValue: part.legendValue,
          });
        });
    } else {
      balanceDataForTheGraph.push(newMainItem);
    }
  });
  return {
    balanceDataForTheGraph,
    balanceDataForTheLegend,
  };
};
