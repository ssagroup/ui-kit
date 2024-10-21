import { useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useFullscreenMode } from '@components/FullscreenModeContext';
import { PieChartProps } from './types';
import { PieChartBase, PieChartTextBase } from './PieChartBases';

export const PieChart = ({
  as,
  className,
  title,
  children,
  width = 400,
  ...chartProps
}: PieChartProps) => {
  const { toggleFullscreenMode, isFullscreenMode } = useFullscreenMode();
  return (
    <PieChartBase
      as={as}
      className={className}
      width={width}
      isFullscreenMode={isFullscreenMode}
      onClick={toggleFullscreenMode}>
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
  );
};
