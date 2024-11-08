import { useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import {
  useFullscreenMode,
  WithFullscreenMode,
} from '@components/FullscreenModeContext';
import { WithWidgetCard } from '@components/WidgetCard';
import { PieChartProps } from './types';
import { PieChartBase, PieChartTextBase } from './PieChartBases';
import { PieChartHeader } from './PieChartHeader';

const PieChartComponent = ({
  as,
  className,
  title,
  children,
  width = '400px',
  features = [],
  cardProps,
  activeHighlight = false,
  onFullscreenModeChange,
  ...chartProps
}: PieChartProps) => {
  const { isFullscreenMode, activeId, setActiveId } = useFullscreenMode();
  const {
    activeInnerRadiusOffset = 0,
    activeOuterRadiusOffset = 0,
    isInteractive = false,
  } = chartProps;

  let internalOffset = 0;
  if (isInteractive) {
    internalOffset = Math.max(
      ...[activeInnerRadiusOffset, activeOuterRadiusOffset],
    );
  }

  useEffect(() => {
    onFullscreenModeChange?.(isFullscreenMode);
  }, [isFullscreenMode]);

  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        headerContent: <PieChartHeader features={features} />,
        ...cardProps,
      }}>
      <PieChartBase
        as={as}
        className={className}
        width={width}
        isFullscreenMode={isFullscreenMode}>
        <div className="pie-chart-wrapper">
          <ResponsivePie
            isInteractive={false}
            margin={{
              top: internalOffset,
              right: internalOffset,
              bottom: internalOffset,
              left: internalOffset,
            }}
            innerRadius={0.8}
            enableArcLinkLabels={false}
            enableArcLabels={false}
            padAngle={2}
            cornerRadius={16}
            activeInnerRadiusOffset={0}
            activeOuterRadiusOffset={0}
            colors={{ datum: 'data.color' }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            layers={['arcs', 'arcLinkLabels', 'arcLabels']}
            activeId={activeId}
            onActiveIdChange={(activeId: string | number | null) => {
              activeHighlight && setActiveId(activeId);
            }}
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

export const PieChart = WithFullscreenMode(PieChartComponent);
