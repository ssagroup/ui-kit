import { Theme } from '@emotion/react';
import { MainColors } from '@ssa-ui-kit/core';

export type ProgressInfoItemProps = {
  id: string;
  date: string;
  label: string;
  value: number;
  color: string;
  colorTag: keyof MainColors | undefined;
};

export type ProgressInfoResp = {
  [key: string]: { [key: string]: ProgressInfoItemProps[] };
};

export interface IProgressInfoProps {
  data: ProgressInfoResp;
  className?: string;
}

export interface ProgressInfoTotalsProps {
  theme: Theme;
  total: number;
}

export type PeriodOption = { value: string; id: string };

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';
