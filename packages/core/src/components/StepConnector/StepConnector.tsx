import { css, useTheme } from '@emotion/react';

import { useStepperContext } from '@components/Stepper';
import { useStepContext } from '@components/Step';

import {
  StepConnectorLineVertical,
  StepConnectorWrapper,
  StepConnectorLine,
} from './style';

const StepConnector = () => {
  const theme = useTheme();
  const { orientation, color, inverted } = useStepperContext();
  const { active, completed } = useStepContext();

  const selectedColor = active || completed ? color : theme.colors.grey;

  return orientation === 'vertical' ? (
    <div
      css={css`
        flex: 1 1 auto;
        margin-left: calc(12px - 1px);
      `}>
      <span css={StepConnectorLineVertical(selectedColor)}></span>
    </div>
  ) : (
    <div css={StepConnectorWrapper(inverted)}>
      <span css={StepConnectorLine(selectedColor)}></span>
    </div>
  );
};

export default StepConnector;
