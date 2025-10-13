import { css, Theme, useTheme } from '@emotion/react';

import Checkbox from '@components/Checkbox';
import { CheckboxProps, checkboxStyles } from '@components/Checkbox';

const getStyles = (theme: Theme) => css`
  margin: 0 0 14px;
  & span {
    margin-left: 16px;
    color: ${theme.colors.greyDisabled};
    user-select: none;
  }
  & input + div {
    border-radius: 2px;
    &::before {
      border-radius: 2px;
    }
  }
  ${checkboxStyles.blueInput(theme)}
`;

export const TableFilterCheckbox = (props: CheckboxProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <Checkbox {...props} css={styles} />;
};
