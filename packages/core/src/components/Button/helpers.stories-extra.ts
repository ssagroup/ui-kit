import styled from '@emotion/styled';

import { ButtonVariants } from './types';

export const sizes: Array<keyof MainSizes> = ['small', 'medium', 'large'];
export const variants: Array<keyof ButtonVariants> = [
  'primary',
  'info',
  'secondary',
  'tertiary',
  'attention',
];

export const HeaderTitle = styled.span`
  text-align: center;
  font-weight: 800;
  font-size: 12px;
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template: 'a a a a';
  grid-gap: 10px;
  grid-auto-columns: min-content;
  align-items: center;
  & > span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;
