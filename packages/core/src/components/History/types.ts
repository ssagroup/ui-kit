import React from 'react';

export interface HistoryItemType {
  date: React.ReactNode;
  content: React.ReactNode;
  color?: string;
  key?: string | number;
}

export interface HistoryProps {
  items: HistoryItemType[];
  defaultColor?: string;
  lineColor?: string;
  dateWidth?: number;
  circleSize?: number;
  sx?: React.CSSProperties;
}
