import { StepperBase, StepperItem } from './StepperBase';

import { text } from './styles';
import { StepperProps } from './types';

const Stepper = ({ color = 'green', steps }: StepperProps) => {
  return (
    <StepperBase>
      {steps.map(({ title, caption, done }) => (
        <StepperItem key={title} color={color} done={done}>
          <span css={text}>{caption}</span>
          <span css={text} style={{ fontWeight: 500 }}>
            {title}
          </span>
        </StepperItem>
      ))}
    </StepperBase>
  );
};
export default Stepper;
