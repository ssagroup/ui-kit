import styled from '@emotion/styled';

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-end;

  margin-top: 18px;
  gap: 20px;
  min-height: 100px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 150px;
  }
`;
