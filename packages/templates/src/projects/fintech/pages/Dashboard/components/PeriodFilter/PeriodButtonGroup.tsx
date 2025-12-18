import { ComponentType } from 'react';
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

export const ButtonGroupSM: ComponentType<ButtonGroupProps> = WithVisibleSM(
  PeriodButtonGroup,
  css`
    margin-left: auto;
  `,
);
export const ButtonGroupMD: ComponentType<ButtonGroupProps> =
  WithVisibleMD(PeriodButtonGroup);
