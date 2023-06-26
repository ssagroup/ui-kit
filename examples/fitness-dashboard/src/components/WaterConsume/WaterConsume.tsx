import { css, useTheme } from '@emotion/react';

import {
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  Typography,
  ResponsiveImage,
  ProgressBar,
  ProgressLegend,
  ProgressLegendItem,
  ProgressVertical,
} from '@ssa-ui-kit/core';

import { WaterConsumeProps } from './types';

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
        margin-left: 11.5px;
      `}>
      <span
        css={css`
          display: block;
          border-color: ${active || completed ? '#44b3fc' : '#e0e0e0'};
          border-left-style: dashed;
          border-left-width: 1px;
          min-height: 20px;
        `}></span>
    </div>
  );
};

const CustomStep: React.FC = (props: {
  active?: boolean;
  completed?: boolean;
}) => {
  const { active, completed } = props;

  return (
    <div
      css={css`
        width: 10px;
        height: 10px;
        background-color: ${active || completed ? '#44b3fc' : '#e0e0e0'};
        border-radius: 50%;
      `}></div>
  );
};

/**
 *
 * UI Component shows the water consumption objective of the user
 */
export const WaterConsume = ({
  currentValue,
  active,
  steps,
}: WaterConsumeProps) => {
  const theme = useTheme();

  return (
    <Card
      css={css`
        box-shadow: 0px 10px 40px rgba(42, 48, 57, 0.08);
        border-radius: 20px;
      `}>
      <CardHeader
        icon={
          <ResponsiveImage
            css={{ filter: `drop-shadow(0px 5px 5px ${theme.colors.grey})` }}
            srcSet="/img/water/water_64.png 64w, /img/water/water_48.png 48w"
            sizes="(min-width: 1440px) 64px, 48px"
            src="/img/water/water_48.png"
            alt="Water"
          />
        }>
        <Typography variant="h6" weight="bold">
          Water
        </Typography>
      </CardHeader>

      <CardContent css={{ width: '100%', justifyContent: 'center' }}>
        <div style={{ height: 110, fontSize: 14 }}>
          <ProgressVertical>
            <ProgressLegend>
              <ProgressLegendItem position="end" percentage={100}>
                <span
                  style={{
                    textAlign: 'right',
                    display: 'block',
                    paddingRight: 6,
                  }}>
                  100%
                </span>
              </ProgressLegendItem>
              <ProgressLegendItem position="current" percentage={currentValue}>
                <span
                  style={{
                    textAlign: 'right',
                    display: 'block',
                    paddingRight: 6,
                  }}>
                  {`${currentValue}%`}
                </span>
              </ProgressLegendItem>
              <ProgressLegendItem position="start" percentage={0}>
                <span
                  style={{
                    textAlign: 'right',
                    display: 'block',
                    paddingRight: 6,
                  }}>
                  0%
                </span>
              </ProgressLegendItem>
            </ProgressLegend>
            <ProgressBar percentage={currentValue} color="blueLight" />
          </ProgressVertical>
        </div>

        <Stepper
          color={'#44b3fc'}
          activeStep={active}
          orientation={'vertical'}
          inverted
          sx={{
            rowGap: 0,
          }}>
          {steps.map((step, index) => {
            return (
              <Step key={index} Connector={CustomConnector}>
                <StepLabel StepIcon={CustomStep}>1</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CardContent>
    </Card>
  );
};
