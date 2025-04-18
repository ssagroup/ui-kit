import styled from '@emotion/styled';
import { Point, PointTooltipProps } from '@nivo/line';

const TrendLineTooltipStyled = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey20};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.greyDarker};
  font-weight: 600;
  line-height: 12px;
  font-size: 10px;
  padding: 0.5rem;
`;

export type TrendLineTooltipProps = PointTooltipProps & {
  valueFormat?: (data: Point['data']) => React.ReactNode;
};

export const TrendLineTooltip = ({
  point,
  valueFormat,
}: TrendLineTooltipProps) => {
  const { data } = point;
  const { xFormatted, yFormatted } = point.data;
  return (
    <TrendLineTooltipStyled>
      {valueFormat?.(data) ?? `${xFormatted} - ${yFormatted}`}
    </TrendLineTooltipStyled>
  );
};
