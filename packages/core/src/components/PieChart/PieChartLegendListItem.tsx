import styled from '@emotion/styled';

export const PieChartLegendListItem = styled.li<{
  isFullscreenMode?: boolean;
  isActive?: boolean;
}>`
  display: flex;
  align-items: center;
  height: ${({ isFullscreenMode }) => (isFullscreenMode ? 'auto' : '22px')};
  padding-right: ${({ isFullscreenMode }) => !isFullscreenMode && '5px'};
  background: ${({ isActive, theme }) =>
    isActive && `${theme.colors.greyLighter}`};
  border-top-left-radius: ${({ isFullscreenMode, isActive }) =>
    !isFullscreenMode && isActive && '5px'};
  border-bottom-left-radius: ${({ isFullscreenMode, isActive }) =>
    !isFullscreenMode && isActive && '5px'};
  border-radius: ${({ isFullscreenMode, isActive }) =>
    isFullscreenMode && isActive && '5px'};
`;

export const PieChartLegendListValueListItem = styled.li<{
  isActive?: boolean;
}>`
  padding: 0 12px 0 20px;
  justify-content: flex-start;
  background: ${({ isActive, theme }) =>
    isActive && `${theme.colors.greyLighter}`};
  border-top-right-radius: ${({ isActive }) => isActive && '5px'};
  border-bottom-right-radius: ${({ isActive }) => isActive && '5px'};
`;
