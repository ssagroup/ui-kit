import { Fragment, useEffect, useState } from 'react';

import { css } from '@emotion/react';

import { Card, CardContent, CardHeader, Typography } from '@ssa-ui-kit/core';

import { BmiHeatbar } from './BmiHeatbar';
import { BmiInfo } from './BmiInfo';
import { BmiLabels } from './BmiLabels';
import { BmiPointer } from './BmiPointer';
import { ContentWrapper, TitleWrapper } from './styles';
import { BmiProps } from './types';

/**
 *
 * UI Component that calculates the Body Mass Index of the user
 */
export const Bmi = ({ height = 175, weight = 66 }: BmiProps) => {
  const [info, setInfo] = useState('');
  const [pointer, setPointer] = useState(0);

  const bmi = Number(((weight / (height * height)) * 10000).toFixed(1));

  const setInfos = {
    underWeight: () => {
      setInfo('Under Weight');
      setPointer(10);
    },
    healthy: () => {
      setInfo('Healthy');
      setPointer(40);
    },
    overweight: () => {
      setInfo('Overweight');
      setPointer(70);
    },
    obese: () => {
      setInfo('Obese');
      setPointer(90);
    },
  };

  useEffect(() => {
    if (bmi < 18.5) {
      setInfos.underWeight();
    } else if (bmi > 18.5 && bmi <= 24.9) {
      setInfos.healthy();
    } else if (bmi > 24.9 && bmi < 30) {
      setInfos.overweight();
    } else {
      setInfos.obese();
    }
  }, [bmi]);

  return (
    <Fragment>
      <CardHeader transparent>
        <div css={TitleWrapper}>
          <Typography variant="h5" weight="bold">
            BMI{' '}
          </Typography>
          <Typography variant="h6">Body Mass Index</Typography>
        </div>
      </CardHeader>

      <Card
        css={css`
          box-shadow: 0 10px 40px rgba(29, 22, 23, 0.07);
          border-radius: 16px;
          padding-bottom: 40px;
        `}>
        <CardHeader>
          <Typography variant="h2" weight="medium">
            {bmi}
          </Typography>
          <BmiInfo>
            <Typography variant="subtitle" weight="lighter">
              You&apos;re {info}
            </Typography>
          </BmiInfo>
        </CardHeader>

        <CardContent
          css={css`
            width: 100%;
          `}>
          <div css={ContentWrapper}>
            <BmiPointer data-testid="bmi-pointer" percentage={pointer} />
            <BmiHeatbar />
            <BmiLabels />
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
