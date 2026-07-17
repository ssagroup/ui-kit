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
    <Icon
      name={`carrot-${isUp ? 'up' : 'down'}`}
      size={16}
      data-testid={`dropdown-arrow-${isUp ? 'up' : 'down'}`}
      {...restProps}
    />
  </DropdownArrowBase>
);

export default DropdownArrow;
