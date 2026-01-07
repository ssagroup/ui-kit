import { useTheme } from '@emotion/react';
import {
  MayHaveLabel,
  ResponsivePie as ResponsivePieOriginal,
} from '@nivo/pie';
import { wrapNivoResponsiveComponent } from '../../utils/nivoReact19Compat';

const ResponsivePie = wrapNivoResponsiveComponent(
  ResponsivePieOriginal,
  'ResponsivePie',
);

export type GaugeChartData = { color?: string; value?: number } & MayHaveLabel;

export type GaugeChartBaseProps = React.ComponentProps<
  typeof ResponsivePie<GaugeChartData>
>;

export const GaugeChartBase = ({ ...props }: GaugeChartBaseProps) => {
  const theme = useTheme();
  return (
    <ResponsivePie
      startAngle={-90}
      endAngle={90}
      innerRadius={0.8}
      padAngle={1}
      cornerRadius={100}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      colors={({ data }) => data.color ?? (theme.colors.greyLighter as string)}
      isInteractive={false}
      animate={false}
      sortByValue={false}
      fit={true}
      layers={['arcs', 'legends']}
      {...props}
    />
  );
};
