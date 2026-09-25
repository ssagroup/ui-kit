import { useId, useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import { useElementSize } from '@ssa-ui-kit/hooks';

import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';

import { FunnelChartProps, FunnelChartRender } from './types';
import { DESIGN_HEIGHT, getDefaultColors, getGeometry } from './utils';
import * as S from './styles';

const POINTER_LABEL_GAP = 12;

const LEADER_LINE_OFFSET = 4;
const MIN_SHAPE_SCALE_RATIO = 0.5;

// Widths of `count` elements, re-measured after every render and only
// updated when they change.
const useMeasuredWidths = (count: number) => {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  useLayoutEffect(() => {
    const next = refs.current
      .slice(0, count)
      .map((element) => element?.offsetWidth ?? 0);
    setWidths((previous) =>
      previous.length === next.length &&
      previous.every((width, index) => width === next[index])
        ? previous
        : next,
    );
  });
  return [refs, widths] as const;
};

const defaultRenderLabel: FunnelChartRender = (_, index) => index + 1;
const defaultRenderPointerLabel: FunnelChartRender = (item) => item.value;
const defaultRenderTooltip: FunnelChartRender = (item) =>
  `${item.label}: ${item.value}`;

/**
 * FunnelChart - Stage diagram drawn as a funnel or a triangle
 *
 * Every level has the same height regardless of its value, so zero or
 * non-decreasing values never collapse or distort the shape. The chart scales
 * to fit its container — give the container a height, or it falls back to the
 * shape's own aspect ratio.
 *
 * @category Charts
 *
 * @example
 * ```tsx
 * <FunnelChart
 *   withPointer
 *   data={[
 *     { label: 'Visitors', value: 1200 },
 *     { label: 'Leads', value: 300 },
 *     { label: 'Customers', value: 0 },
 *   ]}
 * />
 * ```
 */
export const FunnelChart = ({
  data,
  type = 'funnel',
  withPointer = false,
  withTooltip = true,
  withLabels = true,
  renderLabel = defaultRenderLabel,
  renderPointerLabel = defaultRenderPointerLabel,
  renderTooltip = defaultRenderTooltip,
  tooltipProps,
  className,
  'aria-label': ariaLabel,
}: FunnelChartProps) => {
  const theme = useTheme();
  const clipPathId = useId();
  const { ref: containerRef, ...containerSize } =
    useElementSize<HTMLDivElement>();

  // Labels don't scale with the shape. Pointer label widths decide how large
  // the shape can be while they still fit; level label widths decide where
  // the leader line starts so it doesn't cross the label.
  const [pointerLabelRefs, pointerLabelWidths] = useMeasuredWidths(
    withPointer ? data.length : 0,
  );
  const [innerLabelRefs, innerLabelWidths] = useMeasuredWidths(
    withPointer ? data.length : 0,
  );

  // Keep the root mounted without data: useElementSize only attaches its
  // observer when the ref is set on a render that mounts, so returning null
  // here would leave the chart unmeasured once data arrives.
  if (data.length === 0) {
    return <div ref={containerRef} className={className} css={S.root} />;
  }

  const geometry = getGeometry(type, data.length);
  const defaultColors = getDefaultColors(theme, type, data.length);
  const center = geometry.width / 2;
  const pointerEdges = geometry.bands.map(
    (band) => center + geometry.halfWidthAt(band.labelY),
  );

  const fitScale = Math.min(
    containerSize.height / DESIGN_HEIGHT,
    containerSize.width / geometry.width,
  );
  const labelsFitScale = Math.min(
    ...pointerLabelWidths.map(
      (labelWidth, index) =>
        (containerSize.width - POINTER_LABEL_GAP - labelWidth) /
        pointerEdges[index],
    ),
  );
  // Shrink the shape to make room for pointer labels, but never below half
  // its fitted size — past that, labels overflow rather than the shape
  // vanishing.
  const scale = Math.max(
    Math.min(fitScale, labelsFitScale),
    fitScale * MIN_SHAPE_SCALE_RATIO,
  );
  const width = geometry.width * scale;
  const height = DESIGN_HEIGHT * scale;

  const label =
    ariaLabel ?? data.map((item) => `${item.label}: ${item.value}`).join(', ');

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={label}
      className={className}
      css={S.root}
      style={{ aspectRatio: `${geometry.width} / ${DESIGN_HEIGHT}` }}>
      <div css={S.chart} style={{ visibility: scale ? undefined : 'hidden' }}>
        <div css={S.content}>
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${geometry.width} ${DESIGN_HEIGHT}`}
            css={S.svg}
            aria-hidden>
            <defs>
              <clipPath id={clipPathId}>
                <path d={geometry.outline} />
              </clipPath>
            </defs>
            <g clipPath={`url(#${clipPathId})`}>
              {geometry.bands.map((band, index) => {
                const item = data[index];
                const isLast = index === data.length - 1;
                // Overlap the next level by half a unit to hide anti-aliasing seams.
                const rect = (
                  <rect
                    x={0}
                    y={band.top}
                    width={geometry.width}
                    height={band.bottom - band.top + (isLast ? 0 : 0.5)}
                    fill={item.color ?? defaultColors[index]}
                    data-testid="funnel-chart-level"
                  />
                );
                return withTooltip ? (
                  <Tooltip
                    key={item.id ?? index}
                    enableHover
                    enableClick={false}
                    enableClientPoint
                    placement="top"
                    size="medium"
                    {...tooltipProps}>
                    <TooltipTrigger>{rect}</TooltipTrigger>
                    <TooltipContent>
                      {renderTooltip(item, index)}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <g key={item.id ?? index}>{rect}</g>
                );
              })}
              {withPointer &&
                geometry.bands.map((band, index) => (
                  <line
                    key={data[index].id ?? index}
                    x1={Math.min(
                      pointerEdges[index],
                      center +
                        (innerLabelWidths[index]
                          ? (innerLabelWidths[index] / 2 + LEADER_LINE_OFFSET) /
                            scale
                          : 0),
                    )}
                    y1={band.labelY}
                    x2={pointerEdges[index]}
                    y2={band.labelY}
                    stroke={theme.colors.white}
                    strokeWidth={scale ? 1 / scale : 0}
                    strokeLinecap="round"
                    css={S.noPointerEvents}
                  />
                ))}
            </g>
          </svg>
          {withLabels &&
            geometry.bands.map((band, index) => (
              <span
                key={data[index].id ?? index}
                ref={(element) => {
                  innerLabelRefs.current[index] = element;
                }}
                css={S.innerLabel}
                style={{ left: center * scale, top: band.labelY * scale }}>
                {renderLabel(data[index], index)}
              </span>
            ))}
          {withPointer && (
            <div
              css={S.pointerLabels}
              style={{ marginLeft: -width, minWidth: width, height }}>
              {geometry.bands.map((band, index) => (
                <div
                  key={data[index].id ?? index}
                  css={S.pointerLabelRow}
                  style={{
                    paddingLeft:
                      pointerEdges[index] * scale + POINTER_LABEL_GAP,
                    marginTop: band.labelY * scale,
                  }}>
                  <span
                    ref={(element) => {
                      pointerLabelRefs.current[index] = element;
                    }}
                    css={S.pointerLabel}>
                    {renderPointerLabel(data[index], index)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
