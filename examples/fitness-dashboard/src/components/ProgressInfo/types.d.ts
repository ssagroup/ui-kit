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

type PositionSizeCoordenates = {
  [size: string]: {
    x: number;
    y: number;
  };
};

export type TextPositionMap = {
  [key: string]: PositionSizeCoordenates;
};

export type ProgressInfoResp = {
  [key: string]: { [key: string]: ProgressInfoItemProps[] };
};

export type PeriodOption = { val: string; id: string };

export type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';
