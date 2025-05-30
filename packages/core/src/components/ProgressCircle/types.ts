export interface ProgressCircleProps {
  max: number;
  currentValue: number;
  size?: number;
  color?: keyof MainColors;
  infoContent?: React.ReactNode | string;
  mode?: 'default' | 'infinite';
  classnames?: {
    root?: string;
    outer?: string;
    inner?: string;
    svg?: string;
    svgCircle?: string;
  };
}
