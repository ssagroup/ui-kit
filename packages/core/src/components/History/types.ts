import React from 'react';

/**
 * Single timeline row model for `History`.
 */
export interface HistoryItemType {
  /**
   * Left column value (date/time/period label).
   */
  date: React.ReactNode;
  /**
   * Main row content shown in the right column.
   */
  content: React.ReactNode;
  /**
   * Optional marker color for this row.
   * If omitted, `defaultColor` from `HistoryProps` is used.
   */
  color?: string;
  /**
   * Optional stable React key.
   */
  key?: string | number;
}

/**
 * Props for the `History` timeline component.
 */
export interface HistoryProps {
  /**
   * Timeline rows to render from top to bottom.
   */
  items: HistoryItemType[];
  /**
   * Default marker color for rows without `item.color`.
   * Falls back to `theme.palette.primary.main`.
   */
  defaultColor?: string;
  /**
   * Connector line color between markers.
   * Falls back to `theme.colors.greyLighter`.
   */
  lineColor?: string;
  /**
   * Width of the date column in pixels.
   * @default 120
   */
  dateWidth?: number;
  /**
   * Marker circle diameter in pixels.
   * @default 12
   */
  circleSize?: number;
  /**
   * Inline style for the root container.
   */
  sx?: React.CSSProperties;
}
