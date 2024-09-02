import { LabelProps } from './types';
import { LabelBase } from './LabelBase';

const Label = ({
  children,
  htmlFor,
  className,
  isDisabled,
  onMouseEnter,
  onMouseLeave,
}: LabelProps) => (
  <LabelBase
    htmlFor={htmlFor}
    isDisabled={isDisabled}
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
    {children}
  </LabelBase>
);

export default Label;
