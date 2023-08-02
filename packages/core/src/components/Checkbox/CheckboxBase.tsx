import styled from '@emotion/styled';
import Label from '@components/Label';

export const CheckboxBase = styled(Label)`
  position: relative;
  display: inline-flex;
  flex-grow: 0;
  align-items: center;
  cursor: pointer;

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

  input:focus + div {
    box-shadow: ${({ theme }) => `-4px 4px 10px ${theme.colors.green40}`};
  }

  input:disabled + div {
    background: ${({ theme }) => theme.colors.greyFocused};
  }

  input:checked + div::before,
  input:indeterminate + div::before {
    background: linear-gradient(
      117.5deg,
      ${({ theme }) => theme.colors.greenLighter} 17.12%,
      ${({ theme }) => theme.colors.green} 85.53%
    );
  }

  input:not(:checked, :indeterminate) + div::before {
    border: 1.5px solid ${({ theme }) => theme.colors.green};
  }

  input:checked + div:hover::before,
  input:indeterminate + div:hover::before {
    background: linear-gradient(
      117.5deg,
      ${({ theme }) => theme.colors.greenLighter60} 17.12%,
      ${({ theme }) => theme.colors.green60} 85.53%
    );
  }

  input:not(:checked, :indeterminate) + div:hover::before {
    border: 1.5px solid ${({ theme }) => theme.colors.green60};
  }

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
