import React from 'react';

export interface TradingInfoCardProps {
  value: React.ReactNode;
  title: string;
  unit?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  link?: string;
}

export type TradingInfoContent = Pick<
  TradingInfoCardProps,
  'value' | 'unit' | 'icon'
>;

export type TradingInfoCardWrapperProps = Pick<
  TradingInfoCardProps,
  'onClick' | 'link'
> & {
  children?: React.ReactNode;
};

export interface TradingInfoCardTooltipProps {
  trigger: string | number | JSX.Element;
  children: React.ReactNode;
}
