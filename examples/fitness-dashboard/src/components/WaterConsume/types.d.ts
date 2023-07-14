export interface WaterConsumeProps {
  minValue?: number;
  maxValue?: number;
  unit?: string;
  active: number;
  currentValue: number;
  steps: {
    title: string;
    caption: string;
  }[];
}
