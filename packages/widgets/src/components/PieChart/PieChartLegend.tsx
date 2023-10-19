import { ProgressInfoLegends } from '@components/ProgressInfo';
import { PieChartLegendProps } from './types';

export const PieChartLegend = ({ data }: PieChartLegendProps) => {
  return <ProgressInfoLegends data={data} />;
};
