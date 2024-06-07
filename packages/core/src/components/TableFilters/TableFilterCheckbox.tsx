import { CheckboxProps, Checkbox, checkboxStyles } from '@components';
import { Theme, css, useTheme } from '@emotion/react';

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
