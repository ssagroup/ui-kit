import styled from '@emotion/styled';

import Icon from '@components/Icon';
import { CommonProps } from '@global-types/emotion';

export const DropdownArrowBase = styled.div<CommonProps>`
  display: flex;
  align-items: center;
`;

interface DropdownArrowProps extends CommonProps {
  isUp: boolean;
}

const DropdownArrow = ({ isUp, ...restProps }: DropdownArrowProps) => (
  <DropdownArrowBase>
    <Icon {...restProps} name={`carrot-${isUp ? 'up' : 'down'}`} size={12} />
  </DropdownArrowBase>
);

export default DropdownArrow;
