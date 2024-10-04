import styled from '@emotion/styled';

export const WidgetInfoLabelBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.greyPopoverLight};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 5px 12px;
    margin-top: 10px;
  }

  svg {
    flex-shrink: 0;
  }
`;
