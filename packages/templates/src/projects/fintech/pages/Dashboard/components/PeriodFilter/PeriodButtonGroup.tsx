import { useTheme, css } from '@emotion/react';
import {
  ButtonGroup,
  ButtonGroupProps,
  WithVisibleMD,
  WithVisibleSM,
} from '@ssa-ui-kit/core';
import * as S from './styles';

export const PeriodButtonGroup = ({
  buttonStyles,
  ...props
}: ButtonGroupProps) => {
  const theme = useTheme();
  return (
    <ButtonGroup
      buttonStyles={
        buttonStyles
          ? css(S.getPeriodButtonStyles(theme), buttonStyles)
          : S.getPeriodButtonStyles(theme)
      }
      {...props}
    />
  );
};

export const ButtonGroupSM = WithVisibleSM(
  PeriodButtonGroup,
  css`
    margin-left: auto;
  `,
);
export const ButtonGroupMD = WithVisibleMD(PeriodButtonGroup);
