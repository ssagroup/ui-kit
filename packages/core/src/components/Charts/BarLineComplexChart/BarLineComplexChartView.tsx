import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { debounce, pathOr, propOr } from '@ssa-ui-kit/utils';
import { useDeviceType } from '@ssa-ui-kit/hooks';
import Wrapper from '@components/Wrapper';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { BarLineComplexChartTooltip } from './BarLineComplexChartTooltip';
import {
  FONT_FAMILY,
  TITLE_FONT_SIZE,
  TITLE_PADDING_LEFT,
  TITLE_PADDING_TOP,
} from './constants';
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
  tooltipContentRef: MutableRefObject<HTMLDivElement | null>;
  extraModeBarButtons: Array<Plotly.ModeBarButtonAny>;
}) => {
  const theme = useTheme();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig();
  const deviceType = useDeviceType();
  const { data } = useBarLineComplexChartContext();
  const timestamps = pathOr<BarLineChartItem[], number[]>([], [0, 'x'])(data);
  const [revision, setRevision] = useState(1);
  const setNewRevision = () => {
    setRevision((currentValue) => currentValue + 1);
  };
  const debounceThrottled = useRef(debounce(setNewRevision, 300));
  const [debouncedFn, cancel] = debounceThrottled.current;
  const { setIsOpen } = useTooltipContext();

  const { layout = {} } = props;
  const {
    margin = {},
    title = {},
    titlefont = {},
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

  if (
    typeof props.cardProps?.title === 'string' &&
    typeof title !== 'string' &&
    typeof title.text !== 'string'
  ) {
    title.text = props.cardProps.title;
  }

  const formattedTicks = timestamps.map((timestamp, index) => {
    const dateTime = new Date(timestamp);
    const monthYear = dateTime
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
      .split(' ');
    const firstLastDate = monthYear.join(', ');
    return index === 0 || index === timestamps.length - 1
      ? firstLastDate
      : monthYear[0];
  });

  const handleDebouncedFn = () => {
    cancel();
    debouncedFn();
  };

  const handleHover = () => {
    setIsOpen(false);
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
      css={{
        position: isFullscreenMode ? 'fixed' : 'static',
        top: isFullscreenMode ? '2.5%' : 'unset',
        left: isFullscreenMode ? '2.5%' : 'unset',
        width: isFullscreenMode ? '95%' : width,
        height: isFullscreenMode ? '95%' : height,
        borderRadius: 20,
        zIndex: isFullscreenMode ? 2 : 1,
        overflow: 'hidden',
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
      <Plot
        divId={'bar-line-complex-chart-graph'}
        css={{
          width: isFullscreenMode ? '100%' : width,
          maxWidth: '100%',
          height: isFullscreenMode ? '100%' : height,
        }}
        revision={revision}
        data={transformedChartData}
        onHover={handleHover}
        useResizeHandler
        layout={{
          hovermode: 'x unified',
          margin: {
            b: isFullscreenMode ? 15 : 0,
            l: propOr(TITLE_PADDING_LEFT.other, deviceType)(TITLE_PADDING_LEFT),
            r: 40,
            t:
              propOr(TITLE_PADDING_TOP.other, deviceType)(TITLE_PADDING_TOP) +
              25,
            pad: 10,
            ...margin,
          },
          title:
            typeof title === 'string'
              ? title
              : {
                  x: 0,
                  y: 1,
                  pad: {
                    l: propOr(
                      TITLE_PADDING_LEFT.other,
                      deviceType,
                    )(TITLE_PADDING_LEFT),
                    t: propOr(
                      TITLE_PADDING_TOP.other,
                      deviceType,
                    )(TITLE_PADDING_TOP),
                  },
                  ...title,
                },
          titlefont: {
            size: isFullscreenMode
              ? 24
              : propOr(TITLE_FONT_SIZE.other, deviceType)(TITLE_FONT_SIZE),
            weight: 700,
            family: FONT_FAMILY,
            ...titlefont,
          },
          barmode: 'group',
          autosize: false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          barcornerradius: 15,
          bargroupgap: 0.2,
          yaxis: {
            showgrid: true,
            rangemode: 'nonnegative',
            zeroline: false,
            tickfont: tickFont,
            ...yaxis,
          },
          yaxis2: {
            showgrid: true,
            overlaying: 'y',
            side: 'right',
            tickfont: tickFont,
            zeroline: false,
            ...yaxis2,
          },
          xaxis: {
            showgrid: true,
            type: 'date',
            hoverformat: '%B',
            tickmode: 'array',
            tickvals: timestamps,
            ticktext: formattedTicks,
            zeroline: false,
            dtick: 31 * 24 * 60 * 60 * 1000,
            tickfont: tickFont,
            ...xaxis,
          },
          legend: {
            orientation: 'h',
            yanchor: 'top',
            xanchor: 'center',
            valign: 'bottom',
            itemclick: 'toggle',
            bgcolor: 'rgba(255, 255, 255, 0)',
            y: isFullscreenMode ? -0.06 : -0.22,
            x: 0.5,
            font: {
              family: FONT_FAMILY,
              size: isFullscreenMode ? 16 : 12,
            },
            ...legend,
          },
          ...layoutRest,
        }}
        config={{
          ...plotlyDefaultLayoutConfig.config,
          modeBarButtons: [extraModeBarButtons, systemModeBarButtons],
        }}
        {...props}
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
