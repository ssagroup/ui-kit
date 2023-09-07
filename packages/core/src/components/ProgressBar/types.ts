export interface ProgressBarProps {
  percentage: number;
  color?: keyof MainColors;
  vertical?: boolean;
  bgColor?: string;
  size?: number;
}
