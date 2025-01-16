import { TableTag } from './TableTag';

export const TradeCell = ({
  localizedName,
  backgroundColor,
  fontColor,
}: {
  localizedName: string;
  backgroundColor?: string;
  fontColor?: string;
}) => (
  <TableTag fontColor={fontColor || ''} backgroundColor={backgroundColor || ''}>
    {localizedName || ''}
  </TableTag>
);
