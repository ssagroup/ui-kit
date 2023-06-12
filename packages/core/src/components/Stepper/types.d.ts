export interface StepperProps {
  steps: {
    title: string;
    caption: string;
    done: boolean;
  }[];
  color?: keyof MainColors;
}
