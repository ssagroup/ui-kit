import styled from '@emotion/styled';

import Icon from '@components/Icon';

export const DropdownArrowBase = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownArrow = ({ isUp }: { isUp: boolean }) => (
  <DropdownArrowBase>
    <Icon name={`carrot-${isUp ? 'up' : 'down'}`} size={12} />
  </DropdownArrowBase>
);

export default DropdownArrow;
