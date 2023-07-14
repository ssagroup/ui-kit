export interface StepperProps {
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  inverted?: boolean;
  sx?: React.CSSProperties;
  children:
    | React.ReactElement<React.PropsWithChildren>[]
    | React.ReactElement<React.PropsWithChildren>;
}

export interface StepperContextType {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  color: string;
  inverted?: boolean;
}
