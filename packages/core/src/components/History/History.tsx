import { useTheme } from '@emotion/react';

import { HistoryProps } from './types';
import {
  container,
  row,
  leftColumn,
  circle,
  connector,
  dateColumn,
  contentColumn,
  FIRST_LINE_TOP_PADDING,
  FIRST_LINE_HEIGHT,
} from './styles';

const DEFAULT_CIRCLE_SIZE = 12;
const DEFAULT_DATE_WIDTH = 120;
const LEFT_COLUMN_MARGIN_RIGHT = 16;

/**
 * History - Vertical timeline component for chronological events.
 *
 * Renders a date column and content column for each item, connected by
 * timeline markers. Marker colors can be set per item or via defaults.
 *
 * ### Color behavior
 * - `item.color` overrides the marker color for a specific row
 * - `defaultColor` is used when `item.color` is not provided
 * - fallback default marker color: `theme.palette.primary.main`
 * - fallback connector color: `theme.colors.greyLighter`
 *
 * ### Alignment behavior
 * The marker is vertically aligned to the first text line and adapts when
 * `circleSize` changes.
 *
 * @category Components
 * @subcategory Display
 *
 * @example
 * ```tsx
 * <History
 *   items={[
 *     { date: '01.01.2026', content: 'Account created' },
 *     { date: '03.01.2026', content: 'Plan upgraded', color: '#10b981' },
 *   ]}
 * />
 * ```
 */
export const History = ({
  items,
  defaultColor,
  lineColor,
  dateWidth = DEFAULT_DATE_WIDTH,
  circleSize = DEFAULT_CIRCLE_SIZE,
  sx,
}: HistoryProps) => {
  const theme = useTheme();
  const resolvedDefaultColor =
    defaultColor ?? (theme.palette.primary.main as string);
  const resolvedLineColor = lineColor ?? (theme.colors.greyLighter as string);
  const circleTopOffset = Math.max(
    0,
    FIRST_LINE_TOP_PADDING + (FIRST_LINE_HEIGHT - circleSize) / 2,
  );

  return (
    <div data-testid="history" css={container} style={sx}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const color = item.color ?? resolvedDefaultColor;

        return (
          <div key={item.key ?? index} css={row}>
            <div
              css={leftColumn(circleSize)}
              style={{ marginRight: LEFT_COLUMN_MARGIN_RIGHT }}>
              <div css={circle(color, circleSize, circleTopOffset)} />
              {!isLast && (
                <div
                  css={connector(resolvedLineColor, circleTopOffset, circleSize)}
                />
              )}
            </div>

            <div css={dateColumn(dateWidth)}>{item.date}</div>

            <div css={contentColumn}>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
};
