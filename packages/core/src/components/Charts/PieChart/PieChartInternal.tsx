import { useEffect, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { css } from '@emotion/react';
import { ResponsivePie } from '@nivo/pie';
import { propOr } from '@ssa-ui-kit/utils';
import { FullscreenModeContextType } from '@components/FullscreenModeContext';
import { WithWidgetCard } from '@components/WidgetCard';
import { PieChartProps, PieChartTooltipViewProps } from './types';
import { PieChartBase, PieChartTextBase } from './PieChartBases';
import { PieChartHeader } from './PieChartHeader';
import { PieChartTooltip } from './PieChartTooltip';
import { PieChartProvider } from './PieChartContext';
import { getFixedNumber, getRoundedNumber } from '../SegmentedPieChart/utils';
import { TOOLTIP_HEIGHT } from './constants';

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
  legendOutputType: legendOutputTypeInitial = 'value',
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

  const [tooltipPosition, setTooltipPosition] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const [tooltipData, setTooltipData] = useState<
    PieChartTooltipViewProps['point'] | null
  >(null);

  const isHeaderIncluded = features.includes('header');
  const [isOpen, setIsOpen] = useState(false);
  const [legendOutputType, setLegendOutputType] = useState(
    legendOutputTypeInitial,
  );
  const { refs, context } = useFloating({
    open: isOpen,
    middleware: [flip({ fallbackAxisSideDirection: 'end' }), shift()],
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const tooltipIsOpened = !!(
    tooltipData &&
    tooltipPosition &&
    ((isEnabled && !isFullscreenMode) ||
      (isFullscreenEnabled && isFullscreenMode))
  );

  const hover = useHover(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps } = useInteractions([hover, dismiss, role]);

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

  const calcTooltipPosition = () => {
    const referenceRect = refs.domReference.current?.getBoundingClientRect();
    const floatingRect = refs.floating.current?.getBoundingClientRect();
    let newX = 0;
    let newY = 0;
    const documentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (referenceRect && floatingRect) {
      newX =
        referenceRect.left + referenceRect.width / 2 - floatingRect.width / 2;
      newY =
        documentScroll +
        referenceRect.top +
        referenceRect.height / 2 -
        floatingRect.height / 2;
      return {
        x: newX,
        y: newY,
      };
    } else if (referenceRect) {
      newX = referenceRect.left + referenceRect.width / 2;
      newY =
        documentScroll +
        referenceRect.top +
        referenceRect.height / 2 -
        TOOLTIP_HEIGHT / 2;
      return {
        x: newX,
        y: newY,
      };
    }
    return null;
  };

  useEffect(() => {
    onFullscreenModeChange?.(isFullscreenMode);
  }, [isFullscreenMode]);

  useEffect(() => {
    setLegendOutputType(legendOutputTypeInitial);
  }, [legendOutputTypeInitial]);

  return (
    <PieChartProvider data={dataForChart} legendOutputType={legendOutputType}>
      <WithWidgetCard
        features={features}
        cardProps={{
          headerContent: <PieChartHeader features={features} />,
          css:
            isHeaderIncluded && isFullscreenMode
              ? css`
                  width: 95% !important;
                  height: 95% !important;
                  top: 2.5% !important;
                  left: 2.5% !important;
                `
              : undefined,
          ...cardProps,
        }}>
        <PieChartBase
          as={as}
          className={className}
          width={width}
          isFullscreenMode={isFullscreenMode}
          isHeaderIncluded={isHeaderIncluded}>
          <div
            className="pie-chart-wrapper"
            ref={refs.setReference}
            {...getReferenceProps()}>
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
              onMouseEnter={(data) => {
                setTooltipData(() => ({ datum: data }));
              }}
              onMouseLeave={() => {
                setTooltipData(() => null);
              }}
              onMouseMove={() => {
                const newPosition = calcTooltipPosition();
                if (newPosition) {
                  setTooltipPosition(() => newPosition);
                }
              }}
              tooltip={() => null}
              {...chartProps}
            />
            {title && (
              <PieChartTextBase isFullscreenMode={isFullscreenMode}>
                {title}
              </PieChartTextBase>
            )}
            <FloatingFocusManager context={context}>
              <PieChartTooltip
                isOpen={tooltipIsOpened}
                point={tooltipData}
                position={tooltipPosition}
                dimension={dimension}
                outputType={outputType}
                isFullscreenMode={isFullscreenMode}
                ref={refs.setFloating}
              />
            </FloatingFocusManager>
          </div>
          {children}
        </PieChartBase>
      </WithWidgetCard>
    </PieChartProvider>
  );
};
