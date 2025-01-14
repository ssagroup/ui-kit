import styled from '@emotion/styled';

export const NoNotifications = styled.div`
  display: flex;
  height: 48px;
  padding: 11px 0 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.greyLighter};
  box-shadow: 0 10px 40px 0 ${({ theme }) => theme.colors.greyShadow};
`;
