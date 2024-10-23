import { ResponsivePie } from '@nivo/pie';
import { useFullscreenMode } from '@components/FullscreenModeContext';
import { WithWidgetCard } from '@components/WidgetCard';
import { PieChartProps } from './types';
import { PieChartBase, PieChartTextBase } from './PieChartBases';
import { PieChartHeader } from './PieChartHeader';

// TODO: create "features" prop, like features = ['fullscreenMode', 'sectorsHighlight'], or features = { ...: true, ... true }
// TODO: storybook Docs => disable fullscreen mode for this page
// or, exclude additional story with fullscreen mode from the documentation chapter
export const PieChart = ({
  as,
  className,
  title,
  children,
  width = '400px',
  features = [],
  cardProps,
  ...chartProps
}: PieChartProps) => {
  const { isFullscreenMode } = useFullscreenMode();
  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        ...cardProps,
        headerContent: <PieChartHeader features={features} />,
      }}>
      <PieChartBase
        as={as}
        className={className}
        width={width}
        isFullscreenMode={isFullscreenMode}>
        <div className="pie-chart-wrapper">
          <ResponsivePie
            isInteractive={false}
            innerRadius={0.8}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            padAngle={2}
            cornerRadius={16}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            layers={['arcs', 'arcLinkLabels', 'arcLabels']}
            {...chartProps}
          />
          {title && (
            <PieChartTextBase isFullscreenMode={isFullscreenMode}>
              {title}
            </PieChartTextBase>
          )}
        </div>
        {children}
      </PieChartBase>
    </WithWidgetCard>
  );
};
