import { IRadioProps } from '@components/Radio/types';

export interface IRadioGroupProps {
  name: string;
  isRequired?: boolean;
  initialState?: string;
  className?: string;
  onChange: (value: string) => void;
  children: React.ReactElement<IRadioProps>[];
}
