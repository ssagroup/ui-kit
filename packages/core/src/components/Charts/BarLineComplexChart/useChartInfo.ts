import { pathOr } from '@ssa-ui-kit/utils';
import { colorPalette } from './colorPalette';

interface UseChartInfo {
  ({ data }: { data: Plotly.Data[] }): { transformedChartData: Plotly.Data[] };
}

export const useChartInfo: UseChartInfo = ({ data }) => {
  const transformedChartData = data.map((item, index) => {
    const markerColor = pathOr<typeof item, string[]>(colorPalette[index], [
      'marker',
      'color',
    ])(item);
    const extraParams: Plotly.Data = {
      mode: 'markers',
      marker: {
        color: markerColor,
        symbol: '',
      },
      yaxis: 'y2',
      connectgaps: true,
    };
    if (!('hovertemplate' in item)) {
      extraParams.hovertemplate = `${item.name}: %{y:}` + '<extra></extra>';
    }
    if (item.type === 'scatter') {
      extraParams.mode = 'lines';
      extraParams.line = {
        shape: 'spline',
      };
    }
    return {
      ...item,
      ...extraParams,
    };
  }) as unknown as Plotly.Data[];

  return { transformedChartData };
};
