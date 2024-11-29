import { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { debounce, pathOr, propOr } from '@ssa-ui-kit/utils';
import { useDeviceType } from '@ssa-ui-kit/hooks';
import Wrapper from '@components/Wrapper';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { useFullscreenMode } from '@components/FullscreenModeContext';
import { BarLineChartItem, BarLineComplexInternalProps } from './types';
import { useChartInfo } from './useChartInfo';
import { BarLineComplexChartTooltip } from './BarLineComplexChartTooltip';
import {
  FONT_FAMILY,
  TITLE_FONT_SIZE,
  TITLE_PADDING_LEFT,
  TITLE_PADDING_TOP,
} from './constants';
import { usePlotlyDefaultConfig } from '../hooks';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';

export const BarLineComplexChartInternal = ({
  width = '670px',
  height = '220px',
  onChange,
  ...props
}: BarLineComplexInternalProps) => {
  const theme = useTheme();
  const plotlyDefaultLayoutConfig = usePlotlyDefaultConfig();
  const { features, data } = useBarLineComplexChartContext();
  const { isFullscreenMode } = useFullscreenMode();
  const { transformedChartData, tooltipContentRef, modeBarButtonsByKey } =
    useChartInfo();
  const { setIsOpen } = useTooltipContext();
  const deviceType = useDeviceType();

  const [revision, setRevision] = useState(1);
  const setNewRevision = () => {
    setRevision((currentValue) => currentValue + 1);
  };
  const debounceThrottled = useRef(debounce(setNewRevision, 300));
  const [debouncedFn, cancel] = debounceThrottled.current;
  const timestamps = pathOr<BarLineChartItem[], number[]>([], [0, 'x'])(data);
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

  new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  const extraModeBarButtons: Array<Plotly.ModeBarButtonAny> = [];
  if (features?.includes('filtering')) {
    extraModeBarButtons.push(modeBarButtonsByKey['filtering']);
  }
  if (features?.includes('fullscreenMode')) {
    extraModeBarButtons.push(modeBarButtonsByKey['fullscreen']);
  }

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
  if (
    typeof props.cardProps?.title === 'string' &&
    typeof title !== 'string' &&
    typeof title.text !== 'string'
  ) {
    title.text = props.cardProps.title;
  }
  return (
    <Wrapper
      css={{
        position: isFullscreenMode ? 'absolute' : 'static',
        top: isFullscreenMode ? 0 : 'unset',
        left: isFullscreenMode ? 0 : 'unset',
        width: isFullscreenMode ? '100%' : width,
        height: isFullscreenMode ? '100%' : height,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: 'rgba(42, 48, 57, 0.08) 0px 10px 40px 0px',
        '& .plotly .modebar-btn': {
          fontSize: isFullscreenMode ? 20 : 16,
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
            tickfont: {
              family: FONT_FAMILY,
              size: isFullscreenMode ? 16 : 12,
            },
            ...yaxis,
          },
          yaxis2: {
            showgrid: true,
            overlaying: 'y',
            side: 'right',
            tickfont: {
              color: theme.colors.greyDarker60,
              family: FONT_FAMILY,
              size: isFullscreenMode ? 16 : 12,
            },
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
            tickfont: {
              family: FONT_FAMILY,
              size: isFullscreenMode ? 16 : 12,
            },
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
          modeBarButtons: [
            extraModeBarButtons,
            [
              'zoom2d',
              'pan2d',
              'select2d',
              'zoomIn2d',
              'zoomOut2d',
              'autoScale2d',
              'resetScale2d',
            ],
          ],
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
