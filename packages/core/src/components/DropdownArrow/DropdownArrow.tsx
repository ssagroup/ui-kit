import styled from '@emotion/styled';

import Icon from '@components/Icon';
import { CommonProps } from '../..';

export const DropdownArrowBase = styled.div<CommonProps>`
  display: flex;
  align-items: center;
`;

const DropdownArrow = ({ isUp }: { isUp: boolean }) => (
  <DropdownArrowBase>
    <Icon name={`carrot-${isUp ? 'up' : 'down'}`} size={12} />
  </DropdownArrowBase>
);

export default DropdownArrow;
