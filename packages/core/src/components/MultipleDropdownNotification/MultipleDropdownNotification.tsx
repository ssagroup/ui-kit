import BadgeBase from '@components/Badge/BadgeBase';
import styled from '@emotion/styled';

const MultipleDropdownNotification = styled(BadgeBase)`
  min-width: 18px;
  width: 18px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blueNotification};
  font-size: 10px;
  border-radius: 50%;
`;

export default MultipleDropdownNotification;
