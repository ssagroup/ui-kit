import { css } from '@emotion/react';

import { BmiLabel } from './BmiLabel';

export const BmiLabels = () => (
  <div
    css={css`
      position: relative;
      margin-top: 5px;
    `}>
    <BmiLabel
      variant={'subtitle'}
      css={css`
        left: 20%;
      `}>
      18.5
    </BmiLabel>
    <BmiLabel
      variant={'subtitle'}
      css={css`
        left: 60%;
      `}>
      25
    </BmiLabel>
    <BmiLabel
      variant={'subtitle'}
      css={css`
        left: 80%;
      `}>
      30
    </BmiLabel>
  </div>
);
