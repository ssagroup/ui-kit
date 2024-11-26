import { useEffect, useRef } from 'react';
import { pathOr } from '@ssa-ui-kit/utils';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { colorPalette } from './colorPalette';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';
import { UseChartInfo } from './types';

export const useChartInfo: UseChartInfo = () => {
  const { setIsOpen, isOpen, context } = useTooltipContext();
  const { filteredData, selected, lineShape } = useBarLineComplexChartContext();
  const tooltipContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      context.refs.setReference(null);
      context.refs.setFloating(null);
    };
  }, []);

  const transformedChartData = filteredData.map((item, index) => {
    const markerColor = pathOr<typeof item, string[]>(colorPalette[index], [
      'marker',
      'color',
    ])(item);
    const { valueDimension = '' } = item;
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
      extraParams.hovertemplate =
        `${item.name}: %{y:}${valueDimension}` + '<extra></extra>';
    }
    if (item.showOnHover === false) {
      extraParams.hoverinfo = 'none';
      extraParams.hovertemplate = '';
    }
    if (item.type === 'scatter') {
      extraParams.mode = 'lines';
      extraParams.line = {
        shape: lineShape,
      };
    }
    return {
      ...extraParams,
      selected: selected.includes(item.name || ''),
      ...item,
    };
  }) as unknown as Plotly.Data[];

  const handleFilterClick: Plotly.ButtonClickEvent = (
    gd: Plotly.PlotlyHTMLElement,
  ) => {
    setIsOpen((state) => !state);
    const filteringIcon = gd.querySelector('[data-attr=filtering-icon]');
    context.refs.setReference(isOpen ? null : (filteringIcon as HTMLElement));
    context.refs.setFloating(
      isOpen ? null : (tooltipContentRef.current as HTMLElement),
    );
  };

  return { transformedChartData, tooltipContentRef, handleFilterClick };
};
