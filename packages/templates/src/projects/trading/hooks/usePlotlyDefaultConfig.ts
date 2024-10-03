import { PlotParams } from 'react-plotly.js';
import { useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import { useAppLayout } from '@trading/pages/AppLayout/useAppLayoutContext';
import { useDeviceType } from './useDeviceType';

interface UsePlotlyDefaultConfig {
  (params: { titleTranslationKey: string }): {
    layout: PlotParams['layout'];
    config: PlotParams['config'];
    emptyBar: PlotParams['data'][0];
  };
}

export const usePlotlyDefaultConfig: UsePlotlyDefaultConfig = ({
  titleTranslationKey,
}) => {
  const theme = useTheme();
  const deviceType = useDeviceType();
  const { t } = useTranslation();
  const { isFullscreenMode } = useAppLayout();

  return {
    layout: {
      margin: {
        b: isFullscreenMode ? undefined : 0,
        l: 50,
        r: 50,
        t: isFullscreenMode ? undefined : 50,
        pad: 10,
      },
      font: {
        family: "'Manrope',sans-serif",
        size: 10,
      },
      title: {
        text: `<b>${t(titleTranslationKey)}</b>`,
        font: {
          size: deviceType === 'mobile' ? 14 : 18,
          color: theme.colors.greyDarker,
        },
        x:
          isFullscreenMode || ['mobile', 'md'].includes(deviceType)
            ? undefined
            : 0.07,
        y: isFullscreenMode ? undefined : 0.93,
      },
      autosize: true,
      hovermode: 'x unified',
    } as PlotParams['layout'],
    config: {
      responsive: true,
      autosizable: true,
    } as PlotParams['config'],
    emptyBar: {
      type: 'bar',
      yaxis: 'y2',
      marker: {
        color: theme.colors.greyLighter,
      },
      hovertemplate: `<b>${t('common.noDataYet')}!</b>` + '<extra></extra>',
      showlegend: false,
    } as PlotParams['data'][0],
  };
};
