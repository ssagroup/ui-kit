import { LineSeries } from '@nivo/line';

export interface HeartRateProps {
  data: LineSeries;
  caption?: string;
  color?: string;
}

export interface BMPProps {
  value: number;
}

export interface HeartRateCaptionProps {
  caption: string;
}
