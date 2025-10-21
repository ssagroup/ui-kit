import React from 'react';

import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import { useStepContext } from '@components/Step';
import { useStepperContext } from '@components/Stepper';

import {
  label,
  labelIcon,
  labelIconVertical,
  labelText,
  labelTitle,
} from './styles';

const StepLabel = ({
  children,
  StepIcon,
}: {
  children?: React.ReactNode;
  StepIcon?: React.FC<{ index: number; completed: boolean; active: boolean }>;
}) => {
  const theme = useTheme();
  const { orientation, color } = useStepperContext();
  const { index, active, completed } = useStepContext();

  const styleIcon = orientation === 'vertical' ? labelIconVertical : labelIcon;

  return (
    <div
      role="listitem"
      css={label}
      style={{
        flexDirection: orientation === 'vertical' ? 'row' : 'column',
      }}>
      <div css={styleIcon}>
        {/* If user set a custom icon, overwrite default */}
        {StepIcon ? (
          <StepIcon index={index} completed={completed} active={completed} />
        ) : completed ? (
          <Icon name="check" size={16} color={color} />
        ) : (
          <div
            css={labelTitle(
              active || completed
                ? color
                : (theme.colors.greyLighter as string),
            )}>
            <span
              style={{
                color:
                  active || completed ? theme.colors.white : theme.colors.grey,
              }}>
              {index + 1}
            </span>
          </div>
        )}
      </div>

      <div css={labelText}>{children}</div>
    </div>
  );
};

export default StepLabel;
