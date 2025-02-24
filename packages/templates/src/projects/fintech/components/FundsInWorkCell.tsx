import { useTheme } from '@emotion/react';

export const FundsInWorkCell = ({ value }: { value: number | null }) => {
  const theme = useTheme();
  if (value === null) {
    return null;
  }
  const color =
    value > 80
      ? theme.colors.green
      : value < 20
        ? theme.colors.red
        : theme.colors.yellowLighter;
  return <span css={{ color }}>{value}%</span>;
};
