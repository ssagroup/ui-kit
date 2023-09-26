import Checkbox, { ICheckboxProps } from '@components/Checkbox';
import theme from '@themes/main';
import { css } from '@emotion/react';
import { blueInputCheckbox } from '@components/Checkbox/styles';

const getStyles = () => css`
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
  ${blueInputCheckbox}
`;

export const TableFilterCheckbox = (props: ICheckboxProps) => {
  const styles = getStyles();
  return <Checkbox {...props} css={styles} />;
};
