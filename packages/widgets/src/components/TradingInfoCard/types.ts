import { SerializedStyles } from '@emotion/react';
import React from 'react';

export interface ITradingInfoCardProps {
  value: React.ReactNode;
  title: string;
  unit?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  link?: string;
}

export type TradingInfoContent = Pick<
  ITradingInfoCardProps,
  'value' | 'unit' | 'icon'
>;

export type ITradingInfoCardWrapperProps = Pick<
  ITradingInfoCardProps,
  'onClick' | 'link'
> & {
  children?: React.ReactNode;
};

export interface ITradingInfoCardTooltipProps {
  trigger: string | number | JSX.Element;
  children: React.ReactNode;
}
