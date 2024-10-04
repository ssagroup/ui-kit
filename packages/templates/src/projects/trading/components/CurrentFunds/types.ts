import { Interpolation, Theme } from '@emotion/react';

export type CurrentFundsProps = {
  longFunds: number;
  longFundsPercents: number;
  shortFunds: number;
  shortFundsPercents: number;
  total: number;
  totalPercents: number;
};

export type TitleBarProps = {
  title: string;
  isAdditionalRightBar?: boolean;
  styles?: Interpolation<Theme>;
};
