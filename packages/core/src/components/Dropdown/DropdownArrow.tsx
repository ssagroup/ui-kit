import styled from '@emotion/styled';
import Icon from '@components/Icon';

export const DropdownArrowBase = styled.div`
  display: flex;
  align-items: center;
`;

export const DropdownArrow = ({
  isUp,
  color,
}: {
  isUp: boolean;
  color?: string;
}) => (
  <DropdownArrowBase>
    <Icon name={`carrot-${isUp ? 'up' : 'down'}`} size={12} color={color} />
  </DropdownArrowBase>
);
