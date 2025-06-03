import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { css } from '@emotion/react';

import Step from '@components/Step';
import StepLabel from '@components/StepLabel';
import Icons from '@components/Icon/icons';

import { StepperProps } from './types';
import Stepper from './index';

export default {
  title: 'Components/Stepper',
  component: Stepper,
  argTypes: {
    sx: {
      control: {
        disable: true,
      },
    },
    color: {
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    orientation: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: ['vertical', 'horizontal'],
      control: {
        type: 'select',
      },
    },
  },
} as Meta<typeof Stepper>;

/*
 *
 * EXAMPLE 1
 * Default horizontal stepper
 */

export const Horizontal: StoryObj = ({
  color,
  activeStep,
  orientation,
  inverted,
}: StepperProps) => {
  const steps = ['step 1', 'step 2', 'step 3'];

  return (
    <div style={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        orientation={orientation}
        color={color}
        inverted={inverted}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

Horizontal.args = {
  color: 'rgba(117, 153, 222, 1)',
  activeStep: 0,
  orientation: 'horizontal',
  inverted: false,
};
Horizontal.storyName = 'Stepper';

/*
 *
 * EXAMPLE 2
 * Vertical stepper
 */

export const Vertical: StoryObj = ({
  inverted,
  color,
  activeStep,
  orientation,
}: StepperProps) => {
  const steps = ['step 1', 'step 2', 'step 3'];

  return (
    <div style={{ width: '100%' }}>
      <Stepper
        inverted={inverted}
        activeStep={activeStep}
        orientation={orientation}
        color={color}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

Vertical.args = {
  color: 'rgba(82, 197, 135, 1)',
  activeStep: 1,
  orientation: 'vertical',
  inverted: false,
};
Vertical.storyName = 'Stepper vertical';

/*
 *
 * EXAMPLE 3
 * Simple customizations
 */

const CustomStep: React.FC = (props: {
  index?: number;
  active?: boolean;
  completed?: boolean;
}) => {
  const { active, completed } = props;

  return (
    <div
      css={css`
        width: 10px;
        height: 10px;
        background-color: ${active || completed ? '#52c587' : '#e0e0e0'};
        border-radius: 50%;
      `}></div>
  );
};

export const Custom: StoryObj = ({
  inverted,
  color,
  activeStep,
  orientation,
}: StepperProps) => {
  const steps = ['step 1', 'step 2', 'step 3'];

  return (
    <div style={{ width: '100%' }}>
      <Stepper
        inverted={inverted}
        activeStep={activeStep}
        orientation={orientation}
        color={color}
        sx={{
          rowGap: 0,
        }}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel StepIcon={CustomStep}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

Custom.args = {
  color: 'rgba(82, 197, 135, 1)',
  activeStep: 1,
  orientation: 'vertical',
  inverted: false,
};
Custom.storyName = 'Stepper custom';

/*
 *
 * EXAMPLE 4
 * Custom Icons and Connector
 */

const CustomStepIcons: React.FC = (props: {
  index?: number;
  active?: boolean;
  completed?: boolean;
}) => {
  const { index, active, completed } = props;

  const customContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${active || completed ? '#52c587' : '#e0e0e0'};
  `;
  const getColor = () => (active || completed ? '#fff' : 'grey');

  switch (index) {
    case 0:
      return (
        <div css={customContainer}>
          <Icons name="calendar" color={getColor()} size={12} />
        </div>
      );
    case 1:
      return (
        <div css={customContainer}>
          <Icons name="settings" color={getColor()} size={12} />
        </div>
      );
    case 2:
      return (
        <div css={customContainer}>
          <Icons name="notification" color={getColor()} size={12} />
        </div>
      );
    default:
      return null;
  }
};

const CustomConnector = ({
  active,
  completed,
}: {
  active?: boolean;
  completed?: boolean;
}) => {
  return (
    <div
      css={css`
        flex: 1 1 auto;
        margin-left: calc(12px - 1px);
      `}>
      <span
        css={css`
          display: block;
          border-color: ${active || completed
            ? 'rgba(82, 197, 135, 1)'
            : 'grey'};
          border-left-style: dashed;
          border-left-width: 2px;
          min-height: 30px;
        `}></span>
    </div>
  );
};

export const CustomIcons: StoryObj = ({
  inverted,
  activeStep,
}: StepperProps) => {
  const steps = ['step 1', 'step 2', 'step 3'];

  return (
    <div style={{ width: '100%' }}>
      <Stepper
        orientation="vertical"
        inverted={inverted}
        activeStep={activeStep}
        color="rgba(82, 197, 135, 1)">
        {steps.map((step, index) => {
          return (
            <Step key={index} Connector={CustomConnector}>
              <StepLabel StepIcon={CustomStepIcons}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

CustomIcons.args = {
  activeStep: 1,
  inverted: false,
};
CustomIcons.parameters = {
  controls: { disable: true },
};
CustomIcons.storyName = 'Stepper custom icons';
