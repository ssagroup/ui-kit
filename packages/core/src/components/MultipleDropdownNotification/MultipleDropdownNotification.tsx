import styled from '@emotion/styled';

const MultipleDropdownNotification = styled.span`
  display: inline-block;

  width: 18px;
  height: 18px;

  padding: 0;

  font-family: Manrope, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;

  border-radius: 50%;

  text-align: center;
  color: #fff;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blueNotification};

  white-space: pre;
`;

export default MultipleDropdownNotification;
