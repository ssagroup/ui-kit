import { css, Theme } from '@emotion/react';

import theme from '@themes/main';

export const pinkBorder = css`
  border: 1px solid ${theme.colors.pink};
`;
export const yellowBorder = css`
  border: 1px solid ${theme.colors.yellow};
`;
export const greenBorder = css`
  border: 1px solid ${theme.colors.green};
`;
export const turquoiseBorder = css`
  border: 1px solid ${theme.colors.turquoise};
`;
export const purpleBorder = css`
  border: 1px solid ${theme.colors.purple};
`;
export const blueLightBorder = css`
  border: 1px solid ${theme.colors.blueLight};
`;
export const blueBorder = css`
  border: 1px solid ${theme.colors.blue};
`;
export const yellowLightBorder = css`
  border: 1px solid ${theme.colors.yellowWarm};
`;

export const pink = (theme: Theme) => css`
  color: ${theme.colors.pink};

  background-color: ${theme.colors.pink20};
  background: linear-gradient(
    90deg,
    ${theme.colors.pink20} 0%,
    ${theme.colors.pinkLighter20} 100%
  );
  box-shadow: -4px 4px 10px ${theme.colors.pinkShadow40};
`;

export const yellow = (theme: Theme) => css`
  color: ${theme.colors.yellow};

  background-color: ${theme.colors.yellow20};
  background: linear-gradient(
    90deg,
    ${theme.colors.yellow20} 0%,
    ${theme.colors.yellowLighter20} 100%
  );
  box-shadow: -4px 4px 10px ${theme.colors.yellowLighter40};
`;

export const yellowLight = (theme: Theme) => css`
  color: ${theme.colors.yellowLighter};

  background-color: ${theme.colors.yellowLighter20};
  background: linear-gradient(
    90deg,
    ${theme.colors.yellowLighter20} 0%,
    ${theme.colors.yellowWarm20} 100%
  );
  box-shadow: -4px 4px 10px ${theme.colors.yellowWarm40};
`;

export const green = (theme: Theme) => css`
  color: ${theme.colors.green};

  background-color: ${theme.colors.green20};
  background: linear-gradient(
    270deg,
    ${theme.colors.greenLighter20} 0%,
    ${theme.colors.green20} 100%
  );
  box-shadow: -4px 4px 10px ${theme.colors.greenLighter40};
`;

export const turquoise = (theme: Theme) => css`
  color: ${theme.colors.turquoise};

  background-color: ${theme.colors.turquoise20};
  background: linear-gradient(
    90deg,
    ${theme.colors.turquoise20} 0%,
    ${theme.colors.turquoiseLighter20} 100%
  );
  box-shadow: -4px 4px 10px ${theme.colors.turquoiseShadow40};
`;

export const purple = (theme: Theme) => css`
  color: ${theme.colors.purple};

  background-color: ${theme.colors.purpleLighter20};
  background: linear-gradient(
    270deg,
    ${theme.colors.purpleLighter20} 0%,
    ${theme.colors.purple20} 100%
  );
  box-shadow: -4px 4px 10px ${theme.colors.purpleLighter40};
`;
export const blue = (theme: Theme) => css`
  color: ${theme.colors.blue};

  background-color: ${theme.colors.blue20};
  background: linear-gradient(
    90deg,
    ${theme.colors.blueLighter20},
    ${theme.colors.blue20}
  );
  box-shadow: -4px 4px 10px ${theme.colors.blueLightDarker40};
`;

export const blueLight = (theme: Theme) => css`
  color: ${theme.colors.blueLight};

  background-color: ${theme.colors.blueLight20};
  background: linear-gradient(
    270deg,
    ${theme.colors.blueLight20} 0%,
    ${theme.colors.blueLightLighter20} 100%
  );
  box-shadow: -4px 4px 10px ${theme.colors.blueLightLighter40};
`;
