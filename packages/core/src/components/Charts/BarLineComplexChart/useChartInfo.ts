import { useEffect, useRef } from 'react';
import { pathOr } from '@ssa-ui-kit/utils';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { useFullscreenMode } from '@components/FullscreenModeContext';
import { colorPalette } from './colorPalette';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';
import { UseChartInfo } from './types';

export const useChartInfo: UseChartInfo = () => {
  const { setIsOpen, isOpen, context } = useTooltipContext();
  const { filteredData, selected, lineShape } = useBarLineComplexChartContext();
  const { isFullscreenMode, setFullscreenMode } = useFullscreenMode();
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
    const valueDimension =
      item.valueDimension === null || item.valueDimension === undefined
        ? ''
        : item.valueDimension;
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

  const handleFullscreenModeClick: Plotly.ButtonClickEvent = () => {
    setFullscreenMode((state) => !state);
  };

  const modeBarButtonsByKey: Record<
    'filtering' | 'fullscreen',
    Plotly.ModeBarButtonAny
  > = {
    filtering: {
      name: 'filtering',
      icon: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M2.73438 2.5C2.605 2.5 2.5 2.605 2.5 2.73438V4.60938C2.5 4.66281 2.51846 4.71461 2.55127 4.75586L8.125 11.723V15.9116C8.125 16.0067 8.182 16.0915 8.26965 16.1276L11.5509 17.4826C11.58 17.4943 11.6106 17.5 11.6406 17.5C11.6866 17.5 11.7313 17.4864 11.7706 17.4606C11.8358 17.417 11.875 17.3439 11.875 17.2656V11.723L17.4487 4.75586C17.4815 4.71461 17.5 4.66281 17.5 4.60938V2.73438C17.5 2.605 17.395 2.5 17.2656 2.5H2.73438ZM2.96875 2.96875H17.0312V4.52698L11.528 11.4062H8.47198L2.96875 4.52698V2.96875ZM8.59375 11.875H11.4062V16.9159L8.59375 15.755V11.875Z" fill="#2B2D31" fill-opacity="0.6"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.73438 2.25C2.46693 2.25 2.25 2.46693 2.25 2.73438V4.60938C2.25 4.7201 2.28853 4.82714 2.35605 4.91203L7.875 11.8107V15.6701C7.875 15.6701 7.86214 16.0606 7.91666 16.1667C7.98574 16.3011 8.17447 16.3588 8.17447 16.3588L11.4555 17.7137L11.4574 17.7145C11.5169 17.7385 11.5794 17.75 11.6406 17.75C11.7368 17.75 11.8288 17.7214 11.9076 17.6698L11.9096 17.6684C12.0438 17.5786 12.125 17.4277 12.125 17.2656V11.8107L17.6444 4.91149C17.7119 4.8266 17.75 4.7201 17.75 4.60938V2.73438C17.75 2.46693 17.5331 2.25 17.2656 2.25H2.73438ZM16.7812 3.21875H3.21875V4.43928L8.59214 11.1562H11.4079L16.7812 4.43928V3.21875ZM8.84375 12.125V15.5877L11.1562 16.5422V12.125H8.84375Z" fill="#2B2D31" fill-opacity="0.6"/>
  </svg>`,
      },
      title: 'Filtering',
      click: handleFilterClick,
      attr: 'filtering-icon',
      gravity: '1',
    },
    fullscreen: {
      name: 'fullscreen',
      icon: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.30005 4.00005C2.30005 3.06116 3.06116 2.30005 4.00005 2.30005H8.00005C8.38665 2.30005 8.70005 2.61345 8.70005 3.00005C8.70005 3.38665 8.38665 3.70005 8.00005 3.70005H4.00005C3.83436 3.70005 3.70005 3.83436 3.70005 4.00005V8.00005C3.70005 8.38665 3.38665 8.70005 3.00005 8.70005C2.61345 8.70005 2.30005 8.38665 2.30005 8.00005V4.00005ZM15.3 3.00005C15.3 2.61345 15.6134 2.30005 16 2.30005H20C20.9389 2.30005 21.7001 3.06116 21.7001 4.00005V8.00005C21.7001 8.38665 21.3866 8.70005 21 8.70005C20.6135 8.70005 20.3 8.38665 20.3 8.00005V4.00005C20.3 3.83436 20.1657 3.70005 20 3.70005H16C15.6134 3.70005 15.3 3.38665 15.3 3.00005ZM3.00005 15.3C3.38665 15.3 3.70005 15.6134 3.70005 16V20C3.70005 20.1657 3.83436 20.3 4.00005 20.3H8.00005C8.38665 20.3 8.70005 20.6135 8.70005 21C8.70005 21.3866 8.38665 21.7001 8.00005 21.7001H4.00005C3.06116 21.7001 2.30005 20.9389 2.30005 20V16C2.30005 15.6134 2.61345 15.3 3.00005 15.3ZM21 15.3C21.3866 15.3 21.7001 15.6134 21.7001 16V20C21.7001 20.9389 20.9389 21.7001 20 21.7001H16C15.6134 21.7001 15.3 21.3866 15.3 21C15.3 20.6135 15.6134 20.3 16 20.3H20C20.1657 20.3 20.3 20.1657 20.3 20V16C20.3 15.6134 20.6135 15.3 21 15.3Z" fill="#2B2D31" fill-opacity="0.6" />
  </svg>`,
      },
      title: isFullscreenMode ? 'Exit fullscreen mode' : 'Fullscreen mode',
      click: handleFullscreenModeClick,
      attr: 'fullscreen-mode-icon',
      gravity: '1',
    },
  };

  return {
    transformedChartData,
    tooltipContentRef,
    modeBarButtonsByKey,
  };
};
