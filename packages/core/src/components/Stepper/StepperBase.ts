import styled from '@emotion/styled';

export const StepperBase = styled.ul`
  position: relative;

  margin: 0;
  padding-left: 30px;
  list-style: none;
`;

export const StepperItem = styled.li<{ done: boolean; color: string }>`
  position: relative;

  &:not(:last-child) {
    padding-bottom: 0.6rem;
  }

  &::before {
    display: inline-block;
    content: '';
    position: absolute;
    top: 3px;
    left: -16px;
    width: 10px;
    height: 100%;
    border-left: 2px dashed ${({ theme }) => theme.colors.greyLighter};
  }

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 3px;
    left: -20px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme, color, done }) =>
      done ? theme.colors[color] : theme.colors.greyLighter};
  }

  &:last-child::before {
    border-left: none;
  }
`;
