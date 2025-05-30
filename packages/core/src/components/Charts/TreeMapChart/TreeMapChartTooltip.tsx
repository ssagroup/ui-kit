import { TooltipProps } from '@nivo/treemap';
import styled from '@emotion/styled';

export const TreeMapTooltipBase = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.green20};
  border-radius: 4px;

  font-size: 12px;
  font-weight: 500;

  padding: 4px 8px;
  display: flex;
  gap: 5px;
`;

export const TreeMapChartTooltip = ({ node }: TooltipProps<object>) => {
  return (
    <TreeMapTooltipBase>
      <span>{node.id}</span>
      <span css={{ fontWeight: 700 }}>{node.formattedValue}</span>
    </TreeMapTooltipBase>
  );
};
