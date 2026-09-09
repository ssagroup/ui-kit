import styled from '@emotion/styled';

import Icon from '@components/Icon';
import { CommonProps } from '@global-types/emotion';

export const DropdownArrowBase = styled.div<CommonProps>`
  display: flex;
  align-items: center;

  /* The label next to it ellipsises; without this the arrow would be squashed
     first, since flex items shrink before their content overflows. */
  flex-shrink: 0;
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
