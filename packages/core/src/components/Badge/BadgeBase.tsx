import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

const BadgeBase = styled.div<CommonProps>`
  display: inline-block;

  font-family: Manrope, sans-serif;
  font-style: normal;
  font-weight: 500;

  border-radius: 6px;

  text-align: center;
  color: #fff;

  white-space: pre;
`;

export default BadgeBase;
