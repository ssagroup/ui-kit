import { Serie } from '@nivo/line';

export interface IHeartRateProps {
  data: Serie;
  caption?: string;
  color?: string;
}

export interface IBMPProps {
  value: number;
}

export interface IHeartRateCaptionProps {
  caption: string;
}
