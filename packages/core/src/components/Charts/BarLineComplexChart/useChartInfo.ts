import { pathOr } from '@ssa-ui-kit/utils';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { colorPalette } from './colorPalette';
import { useEffect } from 'react';

interface UseChartInfo {
  ({
    data,
    lineShape,
  }: {
    data: Plotly.Data[];
    lineShape?: Plotly.ScatterLine['shape'];
  }): {
    transformedChartData: Plotly.Data[];
    handleFilterClick: (gd: Plotly.PlotlyHTMLElement, ev: MouseEvent) => void;
  };
}

export const useChartInfo: UseChartInfo = ({ data, lineShape = 'linear' }) => {
  const { setIsOpen, isOpen, context } = useTooltipContext();

  // TODO: position sometimes is changed... Resolve it!
  useEffect(() => {
    if (!isOpen) {
      context.refs.setReference(null);
      context.refs.setFloating(null);
    }
  }, [isOpen]);

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
        shape: lineShape,
      };
    }
    return {
      ...extraParams,
      ...item,
    };
  }) as unknown as Plotly.Data[];

  const handleFilterClick: Plotly.ButtonClickEvent = (
    gd: Plotly.PlotlyHTMLElement,
  ) => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const filteringIcon = gd.querySelector('[data-attr=filtering-icon]');
      context.refs.setReference(filteringIcon as HTMLElement);
      context.refs.setFloating(filteringIcon as HTMLElement);
    }
  };

  return { transformedChartData, handleFilterClick };
};
