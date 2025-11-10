import { Theme, useTheme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BMPProps } from './types';

const BPMBase = styled.div`
  text-align: center;
  margin-top: 23px;
`;

const BPMValueStyles = css`
  font-weight: 700;
  font-size: 1.728rem; /* 27.65px */
  line-height: 2rem; /* 32px */

  @media (max-width: 900px) {
    font-size: 1.2rem; /* 19.2px */
    line-height: 1.639; /* 26.23px */
  }
`;

const getBPMLabelStyles = (theme: Theme) => css`
  color: ${theme.colors.greyDarker60};
  font-weight: 600;
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
  margin-left: 4px;

  @media (max-width: 900px) {
    font-size: 0.833rem; /* 13.33px */
    line-height: 1.375; /* 22px */
  }
`;

export const BPM = ({ value }: BMPProps) => {
  const theme = useTheme();
  return (
    <BPMBase>
      <span css={BPMValueStyles}>{value}</span>
      <span css={getBPMLabelStyles(theme)}>BPM</span>
    </BPMBase>
  );
};
