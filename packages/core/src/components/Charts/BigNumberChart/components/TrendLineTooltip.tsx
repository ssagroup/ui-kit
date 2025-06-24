import { Theme } from '@emotion/react';
import styled, { Interpolation } from '@emotion/styled';
import { LineSeries, Point, PointTooltipProps } from '@nivo/line';

const TrendLineTooltipStyled = styled.div`
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey20};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.greyDarker};
  font-weight: 600;
  line-height: 12px;
  font-size: 10px;
  padding: 0.5rem;
`;

export interface TrendLineTooltipProps<Series extends LineSeries>
  extends PointTooltipProps<Series> {
  valueFormat?: (data: Point<Series>['data']) => React.ReactNode;
  css?: Interpolation<Theme>;
}

export const TrendLineTooltip = <Series extends LineSeries>({
  point,
  css,
  valueFormat,
}: TrendLineTooltipProps<Series>) => {
  const { data } = point;
  const { xFormatted, yFormatted } = point.data;
  return (
    <TrendLineTooltipStyled css={css}>
      {valueFormat?.(data) ?? `${xFormatted} - ${yFormatted}`}
    </TrendLineTooltipStyled>
  );
};
