export interface IRadioProps {
  id?: string;
  value: string;
  name?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  text?: string;
  className?: string;
}
