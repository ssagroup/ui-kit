import { RadioProps } from '@components/Radio/types';

export interface RadioGroupProps {
  name: string;
  isRequired?: boolean;
  initialState?: string;
  className?: string;
  onChange: (value: string) => void;
  children: React.ReactElement<RadioProps>[];
}
