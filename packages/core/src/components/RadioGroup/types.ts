import { RadioProps } from '@components/Radio/types';

export interface RadioGroupProps {
  name: string;
  isRequired?: boolean;
  externalState?: string | number;
  className?: string;
  onChange: (value: string) => void;
  children?: React.ReactElement<RadioProps>[] | React.ReactElement<RadioProps>;
}
