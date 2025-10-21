import { useTheme } from '@emotion/react';

import { ButtonTextProps, ColoredButtonTextProps } from './types';

export const ButtonText = ({ text, className, testId }: ButtonTextProps) => {
  return (
    <span className={className} data-testid={testId}>
      {text}
    </span>
  );
};

export const WhiteButtonText = ({ text }: ColoredButtonTextProps) => {
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

export const GreyButtonText = ({ text }: ColoredButtonTextProps) => {
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

export const GreyLightButtonText = ({ text }: ColoredButtonTextProps) => {
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

export const DisabledButtonText = ({ text }: ColoredButtonTextProps) => {
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
