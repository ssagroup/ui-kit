export interface WaterConsumeProps {
  max: number;
  currentValue: number;
  unit?: string;
  steps: {
    title: string;
    caption: string;
    done: boolean;
  }[];
}
