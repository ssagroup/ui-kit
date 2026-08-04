import { resolveDisabled } from '@utils/deprecation';
import { LabelProps } from './types';
import { LabelBase } from './LabelBase';

const Label = ({
  children,
  htmlFor,
  className,
  disabled,
  isDisabled,
  onMouseEnter,
  onMouseLeave,
}: LabelProps) => (
  <LabelBase
    htmlFor={htmlFor}
    isDisabled={resolveDisabled('Label', disabled, isDisabled)}
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
    {children}
  </LabelBase>
);

export default Label;
