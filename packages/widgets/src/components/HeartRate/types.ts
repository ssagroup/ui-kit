import { Serie } from '@nivo/line';

export interface HeartRateProps {
  data: Serie;
  caption?: string;
  color?: string;
}

export interface BMPProps {
  value: number;
}

export interface HeartRateCaptionProps {
  caption: string;
}
