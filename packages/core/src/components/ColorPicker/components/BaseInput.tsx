import styled from '@emotion/styled';

export const BaseInput = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  text-align: center;

  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
