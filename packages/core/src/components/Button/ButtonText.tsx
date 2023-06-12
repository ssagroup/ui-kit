import { useTheme } from '@emotion/react';

import { IColoredButtonTextProps, IButtonTextProps } from './types';

export const ButtonText = ({ text, className, testId }: IButtonTextProps) => {
  return (
    <span className={className} data-testid={testId}>
      {text}
    </span>
  );
};

export const WhiteButtonText = ({ text }: IColoredButtonTextProps) => {
  const theme = useTheme();

  return (
    <ButtonText
      testId="white-button-text"
      text={text}
      css={{
        color: theme.colors.white,
      }}
    />
  );
};

export const GreyButtonText = ({ text }: IColoredButtonTextProps) => {
  const theme = useTheme();

  return (
    <ButtonText
      testId="grey-button-text"
      text={text}
      css={{
        color: theme.colors.greyDarker,
      }}
    />
  );
};

export const GreyLightButtonText = ({ text }: IColoredButtonTextProps) => {
  const theme = useTheme();

  return (
    <ButtonText
      testId="greylight-button-text"
      text={text}
      css={{
        color: theme.colors.greyButtonGradient,
      }}
    />
  );
};

export const DisabledButtonText = ({ text }: IColoredButtonTextProps) => {
  const theme = useTheme();

  return (
    <ButtonText
      testId="disabled-button-text"
      text={text}
      css={{
        color: theme.colors.grey40,
      }}
    />
  );
};
