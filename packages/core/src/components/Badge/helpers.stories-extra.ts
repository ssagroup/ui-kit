import styled from '@emotion/styled';

import { MapIconsType } from '@components/Icon/types';

export const sizes: Array<keyof MainSizes> = ['small', 'medium', 'large'];
export const colors: Array<keyof MainColors> = [
  'purple',
  'blueLight',
  'green',
  'blue',
  'pink',
  'turquoise',
  'yellow',
  'yellowWarm',
];

export const icons: Array<{
  color: keyof MainColors;
  icon: keyof MapIconsType;
}> = [
  {
    color: 'blueLight',
    icon: 'information',
  },
  {
    color: 'yellowWarm',
    icon: 'warning',
  },
  {
    color: 'pink',
    icon: 'attention',
  },
];

export const HeaderTitle = styled.span`
  text-align: center;
  font-weight: 800;
  font-size: 10px;
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
