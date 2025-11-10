import { LabelBase } from './LabelBase';
import { LabelProps } from './types';

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
