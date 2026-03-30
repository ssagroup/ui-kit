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
} from './styles';

const DEFAULT_COLOR = '#4178e1';
const DEFAULT_CIRCLE_SIZE = 12;
const DEFAULT_DATE_WIDTH = 120;
const LEFT_COLUMN_MARGIN_RIGHT = 16;

export const History = ({
  items,
  defaultColor = DEFAULT_COLOR,
  lineColor,
  dateWidth = DEFAULT_DATE_WIDTH,
  circleSize = DEFAULT_CIRCLE_SIZE,
  sx,
}: HistoryProps) => {
  const theme = useTheme();
  const resolvedLineColor = lineColor ?? (theme.colors.greyLighter as string);

  return (
    <div data-testid="history" css={container} style={sx}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const color = item.color ?? defaultColor;

        return (
          <div key={item.key ?? index} css={row}>
            <div
              css={leftColumn}
              style={{ marginRight: LEFT_COLUMN_MARGIN_RIGHT }}>
              <div css={circle(color, circleSize)} />
              {!isLast && <div css={connector(resolvedLineColor)} />}
            </div>

            <div css={dateColumn(dateWidth)}>{item.date}</div>

            <div css={contentColumn}>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
};
