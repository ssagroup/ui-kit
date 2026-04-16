import { RefObject, useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { debounce, pathOr } from '@ssa-ui-kit/utils';
import Wrapper from '@components/Wrapper';
import CardHeader from '@components/CardHeader';
import { WidgetCardTitle } from '@components/WidgetCard';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { BarLineComplexChartTooltip } from './BarLineComplexChartTooltip';
import { FONT_FAMILY } from './constants';
import { usePlotlyDefaultConfig } from '../hooks';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';
import { BarLineChartItem, BarLineComplexInternalProps } from './types';

export const BarLineComplexChartView = ({
  width,
  height,
  isFullscreenMode,
  transformedChartData,
  tooltipContentRef,
  extraModeBarButtons,
  systemModeBarButtons = [
    'zoom2d',
    'pan2d',
    'select2d',
    'zoomIn2d',
    'zoomOut2d',
    'autoScale2d',
    'resetScale2d',
  ],
  onChange,
  ...props
}: BarLineComplexInternalProps & {
  isFullscreenMode: boolean;
  transformedChartData: Plotly.Data[];
  tooltipContentRef: RefObject<HTMLDivElement | null>;
  extraModeBarButtons: Array<Plotly.ModeBarButtonAny>;
}) => {
  const theme = useTheme();
  const plotlyWrapperRef = useRef<HTMLDivElement>(null);
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig();
  const { data } = useBarLineComplexChartContext();
  const orientation = pathOr<BarLineChartItem[], 'h' | 'v'>('v', [
    0,
    'orientation',
  ])(data);
  const timestamps = pathOr<BarLineChartItem[], number[]>(
    [],
    [0, orientation === 'v' ? 'x' : 'y'],
  )(data);
  const [revision, setRevision] = useState(1);
  const setNewRevision = () => {
    setRevision((currentValue) => currentValue + 1);
  };
  const debounceThrottled = useRef(debounce(setNewRevision, 300));
  const [debouncedFn, cancel] = debounceThrottled.current;
  const { setIsOpen } = useTooltipContext();

  const { features } = useBarLineComplexChartContext();

  const { layout = {}, config = {}, ...restProps } = props;
  const {
    margin = {},
    yaxis = {},
    yaxis2 = {},
    xaxis = {},
    legend = {},
    ...layoutRest
  } = layout;

  const tickFont = {
    color: theme.colors.greyDarker,
    family: FONT_FAMILY,
    size: isFullscreenMode ? 16 : 12,
    weight: 500,
  };

  const formattedTicks = timestamps.map((timestamp, index) => {
    const dateTime = new Date(timestamp);
    const monthYear = dateTime
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
      .split(' ');
    const firstLastDate = monthYear.join('<br />');
    return index === 0 || index === timestamps.length - 1
      ? firstLastDate
      : monthYear[0];
  });

  const dateAxisProps: Partial<Plotly.LayoutAxis> = {
    showgrid: true,
    type: 'date',
    hoverformat: '%B',
    tickmode: 'array',
    tickvals: timestamps,
    ticktext: formattedTicks,
    tickangle: 0,
    ticklabelmode: 'period',
    ticklabelstep: 1,
    zeroline: false,
    tickfont: tickFont,
  };

  const valuesAxisProps: Partial<Plotly.LayoutAxis> = {
    showgrid: true,
    rangemode: 'nonnegative',
    zeroline: false,
    tickfont: tickFont,
  };

  const handleDebouncedFn = () => {
    cancel();
    debouncedFn();
  };

  const handleHover = () => {
    /**
     * Show tooltip on hover
     * event: Readonly<Plotly.PlotHoverEvent>
     * - event = {}
     * - points:
     * Array<{
     *   bbox: { x0: number; x1: number; y0: number; y1: number; };
     *   curveNumber: number;
     *   data: Plotly.Data;
     *   fullData: Plotly.Data;
     *   label: number;
     *   pointIndex: number;
     *   pointNumber: number;
     *   value: number;
     *   x: number;
     *   y: number;
     *   xaxis: string;
     *   yaxis: string;
     * }>
     * - xaxes: Array<{}>
     * - xvals: Array<number>
     * - yaxes: Array<{}>
     * - yvals: Array<number>
     */
    setIsOpen(false);
  };

  const handleUnhover = () => {
    // Hide tooltip on unhover
    // event: Readonly<Plotly.PlotMouseEvent>
  };

  useEffect(() => {
    window.addEventListener('resize', handleDebouncedFn, false);
    return () => {
      window.removeEventListener('resize', handleDebouncedFn, false);
    };
  }, []);
  return (
    <Wrapper
      className="bar-line-complex-chart-wrapper"
      ref={plotlyWrapperRef}
      css={{
        position: isFullscreenMode ? 'fixed' : 'relative',
        top: isFullscreenMode ? '2.5%' : 'unset',
        left: isFullscreenMode ? '2.5%' : 'unset',
        width: isFullscreenMode ? '95%' : width,
        height: isFullscreenMode ? '95%' : height,
        borderRadius: 20,
        zIndex: isFullscreenMode ? 2 : 1,
        overflow: 'hidden',
        background: theme.colors.white,
        boxShadow: 'rgba(42, 48, 57, 0.08) 0px 10px 40px 0px',
        '& .plotly': {
          '& > div': isFullscreenMode && {
            width: '100% !important',
            '& > svg': {
              width: '100%',
            },
          },
          '& .modebar-btn': {
            fontSize: isFullscreenMode ? 20 : 16,
          },
        },
      }}>
      {features?.includes('header') && props.cardProps?.title && (
        <CardHeader
          css={{
            position: 'absolute',
            top: isFullscreenMode ? '13px' : '10px',
            left: '10px',
            width: 'auto',
            marginBottom: 0,
            zIndex: 1,
          }}>
          <WidgetCardTitle
            variant="h3"
            weight="bold"
            css={{
              flexDirection: 'row',
              fontSize: isFullscreenMode ? '24px' : '12px',
              [theme.mediaQueries.md]: {
                fontSize: isFullscreenMode ? '24px' : '16px',
              },
            }}>
            {props.cardProps.title}
          </WidgetCardTitle>
        </CardHeader>
      )}
      <Plot
        divId={'bar-line-complex-chart-graph'}
        css={{
          width: isFullscreenMode ? '100%' : width,
          maxWidth: '100%',
          height: isFullscreenMode ? '100%' : height,
          '& .legendtitletext': {
            display: orientation === 'h' ? 'none' : 'block',
          },
        }}
        revision={revision}
        data={transformedChartData}
        onHover={handleHover}
        onUnhover={handleUnhover}
        useResizeHandler
        layout={{
          hovermode: orientation === 'v' ? 'x unified' : 'y unified',
          orientation: 1,
          margin: {
            b: isFullscreenMode ? 15 : 0,
            l: orientation === 'v' ? 10 : isFullscreenMode ? 30 : 15,
            r: orientation === 'v' ? 40 : 0,
            t:
              features?.includes('header') && props.cardProps?.title
                ? isFullscreenMode
                  ? 45
                  : 43
                : 10,
            pad: 10,
            ...margin,
          },
          barmode: 'group',
          autosize: false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          bargroupgap: 0.2,
          yaxis: {
            ...(orientation === 'v' ? valuesAxisProps : dateAxisProps),
            ...yaxis,
          },
          yaxis2: {
            showgrid: true,
            overlaying: 'y',
            side: 'right',
            tickfont: tickFont,
            zeroline: false,
            visible: orientation === 'v' ? true : false,
            ...yaxis2,
          },
          xaxis: {
            ...(orientation === 'v' ? dateAxisProps : valuesAxisProps),
            spikesnap: orientation === 'v' ? 'hovered data' : 'cursor',
            ...xaxis,
          },
          legend: {
            orientation: 'h',
            yanchor: 'top',
            xanchor: 'center',
            valign: 'bottom',
            itemclick: 'toggle',
            bgcolor: 'rgba(255, 255, 255, 0)',
            y: isFullscreenMode ? -0.08 : -0.4,
            x: 0.5,
            font: {
              family: FONT_FAMILY,
              size: isFullscreenMode ? 16 : 12,
            },
            traceorder: orientation === 'h' ? 'reversed' : 'normal',
            ...legend,
          },
          ...layoutRest,
        }}
        config={{
          ...plotlyDefaultLayoutConfig.config,
          modeBarButtons: [extraModeBarButtons, systemModeBarButtons],
          ...config,
        }}
        {...restProps}
      />
      <BarLineComplexChartTooltip
        ref={tooltipContentRef}
        css={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: '-2px 2px 8px 0px rgba(43, 45, 49, 0.24)',
          padding: '4px 8px',
        }}
        onChange={onChange}
      />
    </Wrapper>
  );
};
