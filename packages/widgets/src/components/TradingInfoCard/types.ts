import React from 'react';

export interface ITradingInfoCardProps {
  value: string | number;
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
  trigger: JSX.Element;
  children: React.ReactNode;
}
