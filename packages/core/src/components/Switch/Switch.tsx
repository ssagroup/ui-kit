import SwitchBase from './SwitchBase';
import { useSwitchContext } from './SwitchContext';

import { ISwitchProps } from './types';

const Switch = ({ label, isDisabled = false }: ISwitchProps) => {
  const { isOn, toggle } = useSwitchContext();

  return (
    <SwitchBase
      type="button"
      role="switch"
      aria-readonly={isDisabled}
      aria-checked={isOn}
      aria-label={label}
      disabled={isDisabled}
      onClick={() => !isDisabled && toggle()}
    />
  );
};
export default Switch;
