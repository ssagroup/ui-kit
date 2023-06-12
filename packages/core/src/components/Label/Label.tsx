import { LabelProps } from './Label.types';
import { LabelBase } from './LabelBase';

const Label = ({
  children,
  htmlFor,
  className,
  onMouseEnter,
  onMouseLeave,
}: LabelProps) => (
  <LabelBase
    htmlFor={htmlFor}
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
    {children}
  </LabelBase>
);

export default Label;
