export interface RadioProps {
  id?: string;
  value: string;
  name?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  text?: string;
  className?: string;
  colors?: {
    default?: string;
    hovered?: string;
    disabled?: string;
    focusShadow?: string;
  };
}
