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
  const theme = useTheme();
  return (
    <div
      css={css`
        flex: 1 1 auto;
        margin-left: 11.5px;
      `}>
      <span
        css={css`
          display: block;
          border-color: ${active || completed
            ? theme.colors.blueLightLighter
            : theme.colors.greyDarker60};
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
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 6px;
        height: 6px;
        background-color: ${active || completed
          ? theme.colors.blueLightLighter
          : theme.colors.greyDarker60};
        border-radius: 50%;
      `}></div>
  );
};

/**
 *
 * UI Component shows the water consumption objective of the user
 * @param steps - the order goes from top to bottom, from left to right
 */
export const WaterConsume = ({
  minValue = 0,
  maxValue = 100,
  currentValue,
  active,
  steps,
  unit = '%',
}: WaterConsumeProps) => {
  const theme = useTheme();
  const currentPercentage = Math.round((currentValue * 100) / maxValue);

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
            srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fwater%2Fwater_64.png?alt=media&token=2abf9f9c-2159-4235-856c-f054783a007d 64w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fwater%2Fwater_48.png?alt=media&token=abc1e619-940a-4fc0-9f83-ef0a998464f2 48w"
            sizes="(min-width: 1440px) 64px, 48px"
            src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fwater%2Fwater_48.png?alt=media&token=abc1e619-940a-4fc0-9f83-ef0a998464f2"
            alt="Water"
          />
        }>
        <Typography variant="h6" weight="bold">
          Water
        </Typography>
      </CardHeader>

      <CardContent
        css={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
        <div style={{ fontSize: 14, marginRight: '15px' }}>
          <ProgressVertical>
            <ProgressLegend>
              <ProgressLegendItem position="end" percentage={100}>
                <span
                  style={{
                    textAlign: 'right',
                    display: 'block',
                    paddingRight: 6,
                  }}>
                  {`${maxValue}${unit}`}
                </span>
              </ProgressLegendItem>
              <ProgressLegendItem
                position="current"
                percentage={currentPercentage}>
                <span
                  style={{
                    textAlign: 'right',
                    display: 'block',
                    paddingRight: 6,
                  }}>
                  {`${currentValue}${unit}`}
                </span>
              </ProgressLegendItem>
              <ProgressLegendItem position="start" percentage={0}>
                <span
                  style={{
                    textAlign: 'right',
                    display: 'block',
                    paddingRight: 6,
                  }}>
                  {`${minValue}${unit}`}
                </span>
              </ProgressLegendItem>
            </ProgressLegend>
            <ProgressBar percentage={currentPercentage} color="blueLight" />
          </ProgressVertical>
        </div>

        <Stepper
          color={theme.colors.blueLight}
          activeStep={active}
          orientation={'vertical'}
          inverted
          sx={{
            rowGap: 0,
          }}>
          {steps.map((step, index) => {
            return (
              <Step key={index} Connector={CustomConnector}>
                <StepLabel StepIcon={CustomStep}>
                  <span
                    style={{
                      textAlign: 'left',
                      display: 'block',
                      fontSize: 9,
                    }}>
                    {step.caption}
                  </span>
                  <span
                    style={{
                      textAlign: 'left',
                      display: 'block',
                      fontSize: 9,
                      fontWeight: 700,
                    }}>
                    {step.title}
                  </span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CardContent>
    </Card>
  );
};
