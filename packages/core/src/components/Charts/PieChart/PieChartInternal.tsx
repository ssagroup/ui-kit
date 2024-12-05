import { Fragment, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { propOr } from '@ssa-ui-kit/utils';
import { FullscreenModeContextType } from '@components/FullscreenModeContext';
import { WithWidgetCard } from '@components/WidgetCard';
import { PieChartProps } from './types';
import { PieChartBase, PieChartTextBase } from './PieChartBases';
import { PieChartHeader } from './PieChartHeader';
import { PieChartTooltip } from './PieChartTooltip';
import { getFixedNumber, getRoundedNumber } from '../SegmentedPieChart/utils';
import { PieChartProvider } from './PieChartContext';

export const PieChartInternal = ({
  as,
  className,
  title,
  children,
  width = '400px',
  features = [],
  cardProps,
  activeHighlight = false,
  isFullscreenMode,
  activeId,
  data,
  legendOutputType = 'value',
  tooltipProps,
  setActiveId,
  onFullscreenModeChange,
  ...chartProps
}: PieChartProps &
  Pick<
    FullscreenModeContextType,
    'activeId' | 'isFullscreenMode' | 'setActiveId'
  >) => {
  const {
    activeInnerRadiusOffset = 0,
    activeOuterRadiusOffset = 0,
    isInteractive = false,
  } = chartProps;

  const {
    valueRoundingDigits = false,
    percentageRoundingDigits = 0,
    dimension,
    outputType = 'value',
    isEnabled = false,
    isFullscreenEnabled = false,
  } = tooltipProps || {};

  const totalAmount = data.reduce((acc, item) => {
    const currentValue = propOr<typeof item, number>(0, 'value')(item);
    return +currentValue + +acc;
  }, 0);

  const dataForChart = data.map((item) => {
    const currentValue = propOr<typeof item, number>(0, 'value')(item);
    const currentPercentage = (+currentValue * 100) / totalAmount;
    return {
      ...item,
      percentage:
        typeof percentageRoundingDigits === 'number'
          ? getFixedNumber(currentPercentage, percentageRoundingDigits)
          : getRoundedNumber(currentPercentage, 0),
      value:
        typeof valueRoundingDigits === 'number'
          ? getFixedNumber(currentValue, valueRoundingDigits)
          : currentValue,
    };
  });

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
    <PieChartProvider data={dataForChart} legendOutputType={legendOutputType}>
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
              data={dataForChart}
              tooltip={
                (isEnabled && !isFullscreenMode) ||
                (isFullscreenEnabled && isFullscreenMode)
                  ? (point) => (
                      <PieChartTooltip
                        point={point}
                        dimension={dimension}
                        outputType={outputType}
                        isFullscreenMode={isFullscreenMode}
                      />
                    )
                  : () => <Fragment></Fragment>
              }
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
    </PieChartProvider>
  );
};
