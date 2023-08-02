import styled from '@emotion/styled';
import { outlineStyles } from '@styles/safari-focus-outline';

const SwitchBase = styled.button`
  width: 44px;
  height: 24px;
  border: 0;
  outline: 0;
  padding: 0;
  border-radius: 50px;
  position: relative;
  background: ${({ theme }) =>
    `linear-gradient(117.5deg, ${theme.colors.greenLighter}, ${theme.colors.green});`};
  cursor: pointer;

  &::before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    right: 5px;
    bottom: calc(50% - 7px);
    background-color: ${({ theme }) => theme.colors.white};

    transition: 0.4s;

    border-radius: 50%;
  }

  &[aria-checked='false'] {
    background: ${({ theme }) => theme.colors.greyFocused};
  }

  &:focus {
    box-shadow: ${({ theme }) => `-4px 4px 10px ${theme.colors.green40}`};
    outline: 0;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.greyDisabled};
    cursor: auto;
  }

  &:not(:disabled):hover {
    box-shadow: ${({ theme }) => `-4px 4px 10px ${theme.colors.green40}`};
  }

  &[aria-checked='false']:focus::after,
  &:not(:disabled)[aria-checked='false']:hover::after {
    ${({ theme }) => outlineStyles(theme, 'greenLighter', '50px')}
  }

  &[aria-checked='true']::before {
    transform: translateX(0);
  }

  &[aria-checked='false']::before {
    transform: translateX(-20px);
  }
`;

export default SwitchBase;
