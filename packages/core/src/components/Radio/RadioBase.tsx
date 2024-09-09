import styled from '@emotion/styled';
import Label from '@components/Label';

export const RadioBase = styled(Label)`
  display: inline-flex;
  flex-grow: 0;
  align-items: center;
  cursor: pointer;
  gap: 5px;

  &:has(input:disabled) {
    cursor: default;
  }

  input:focus + svg {
    filter: drop-shadow(
      ${({ theme }) => `-4px 4px 10px ${theme.colors.green40}`}
    );
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
    font-size: 14px;
    font-weight: 100;
  }
`;
