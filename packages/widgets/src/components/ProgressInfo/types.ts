import { MainColors } from '@ssa-ui-kit/core';

export interface ProgressInfoItemProps {
  id: string;
  date: string;
  label: string;
  value: number;
  color: string;
  colorTag: keyof MainColors | undefined;
}
export interface ProgressInfoMetricProps {
  textPosition: TextPositionMap;
  total: number;
  size: string;
}

type PositionSizeCoordinates = {
  [size: string]: {
    x: number;
    y: number;
  };
};

export type TextPositionMap = {
  [key: string]: PositionSizeCoordinates;
};

export type ProgressInfoResp = {
  [key: string]: { [key: string]: ProgressInfoItemProps[] };
};

export interface IProgressInfoProps {
  data: ProgressInfoResp;
}

export type PeriodOption = { value: string; id: string };

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';
