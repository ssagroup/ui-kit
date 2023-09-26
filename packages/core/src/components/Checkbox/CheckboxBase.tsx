import styled from '@emotion/styled';
import Label from '@components/Label';
import { blueInputCheckbox, greenInputCheckbox } from './styles';
import { ICheckboxProps } from './types';

export const CheckboxBase = styled(Label)<Pick<ICheckboxProps, 'color'>>`
  position: relative;
  display: inline-flex;
  flex-grow: 0;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  &:has(input:disabled) {
    cursor: default;
  }

  div {
    position: relative;
    height: 20px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  input + div {
    svg {
      z-index: 2;
    }

    &::before {
      content: '';
      position: absolute;
      box-sizing: border-box;
      height: 20px;
      width: 20px;
      top: 0;
      left: 0;
      border-radius: 6px;
      z-index: 1;
    }
  }

  ${({ color = 'green' }) => {
    switch (color) {
      case 'blue':
        return blueInputCheckbox;
      case 'green':
        return greenInputCheckbox;
      default:
    }
  }}

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  span {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 100;
  }
`;
