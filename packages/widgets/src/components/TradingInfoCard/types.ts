import React from 'react';

export interface ITradingInfoCardProps {
  value: React.ReactNode;
  title: string;
  unit?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export type TradingInfoContent = Pick<
  ITradingInfoCardProps,
  'value' | 'unit' | 'icon'
>;

export interface ITradingInfoCardTooltipProps {
  trigger: string | number | JSX.Element;
  children: React.ReactNode;
}
