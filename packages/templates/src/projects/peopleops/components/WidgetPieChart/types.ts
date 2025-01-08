import { CSSInterpolation } from '@emotion/css';
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
  labelListStyles?: CSSInterpolation;
  valueListStyles?: CSSInterpolation;
  handleFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}
