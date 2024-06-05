export interface ProgressCircleProps {
  max: number;
  currentValue: number;
  size?: number;
  color?: keyof MainColors;
  infoContent?: React.ReactNode | string;
}
