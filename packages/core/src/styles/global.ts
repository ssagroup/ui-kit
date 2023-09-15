import { css, Theme } from '@emotion/react';

export const pink = (theme: Theme) => css`
  background-color: ${theme.colors.pink};
  background: linear-gradient(
    99.26deg,
    ${theme.colors.pink},
    ${theme.colors.pinkLighter}
  );
  box-shadow: -4px 4px 10px ${theme.colors.pinkLighter40};
`;

export const yellow = (theme: Theme) => css`
  background-color: ${theme.colors.yellow};
  background: linear-gradient(
    90deg,
    ${theme.colors.yellow},
    ${theme.colors.yellowLighter}
  );
  box-shadow: -4px 4px 10px ${theme.colors.yellowLighter40};
`;

export const green = (theme: Theme) => css`
  background-color: ${theme.colors.green};
  background: linear-gradient(
    295.98deg,
    ${theme.colors.green},
    ${theme.colors.greenLighter}
  );
  box-shadow: -4px 4px 10px ${theme.colors.greenLighter40};
`;

export const turquoise = (theme: Theme) => css`
  background-color: ${theme.colors.turquoise};
  background: linear-gradient(
    116.22deg,
    ${theme.colors.turquoise},
    ${theme.colors.turquoiseLighter}
  );
  box-shadow: -4px 4px 10px ${theme.colors.turquoiseLighter40};
`;

export const purple = (theme: Theme) => css`
  background-color: ${theme.colors.purple};
  background: linear-gradient(
    243.84deg,
    ${theme.colors.purpleLighter},
    ${theme.colors.purple}
  );
  box-shadow: -4px 4px 10px ${theme.colors.purpleLighter40};
`;

export const blue = (theme: Theme) => css`
  background-color: ${theme.colors.blue};
  background: linear-gradient(
    90deg,
    ${theme.colors.blue},
    ${theme.colors.blueLighter}
  );
  box-shadow: -4px 4px 10px ${theme.colors.blueLighter40};
`;

export const blueLight = (theme: Theme) => css`
  background-color: ${theme.colors.blueLight};
  background: linear-gradient(
    247.37deg,
    ${theme.colors.blueLightLighter},
    ${theme.colors.blueLight}
  );
  box-shadow: -4px 4px 10px ${theme.colors.blueLightLighter40};
`;

export const blueLightDarker = (theme: Theme) => css`
  background-color: ${theme.colors.blueLightDarker};
  background: linear-gradient(
    247.37deg,
    ${theme.colors.blueDark},
    ${theme.colors.blueLightDarker}
  );
  box-shadow: -4px 4px 10px ${theme.colors.blueLightDarker40};
`;
