import { SerializedStyles } from '@emotion/react';
import { CategoricalColorSchemeId } from '@nivo/colors';

import { PieChartFeatures } from '@ssa-ui-kit/core';

export interface WidgetPieChartProps {
  data: Array<{
    caption: string;
    count: number;
  }>;
  cardTitle: string;
  chartColors?: string[];
  colorSchemeId: CategoricalColorSchemeId;
  gridArea: string;
  hintEnabled?: boolean;
  pieChartHeight?: string;
  pieChartWidth?: string;
  wrapperClassname?: string;
  headerClassname?: string;
  features?: Array<PieChartFeatures>;
  labelListStyles?: SerializedStyles;
  valueListStyles?: SerializedStyles;
  handleFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}
