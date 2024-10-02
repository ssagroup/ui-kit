import { useTheme, css } from '@emotion/react';
import Typography from '@components/Typography';

export const ChartTitle = ({
  totalAmount,
  totalDimension,
}: {
  totalAmount: number;
  totalDimension: string;
}) => {
  const theme = useTheme();
  return (
    <Typography
      variant="body2"
      weight="bold"
      color={theme.colors.greyDarker}
      css={css`
        font-size: 20px;
        line-height: 25px;
      `}>
      {totalAmount} &nbsp;
      <Typography
        variant="body2"
        weight="regular"
        as="span"
        color={theme.colors.greyDarker80}
        css={css`
          font-size: 14px;
        `}>
        {totalDimension}
      </Typography>
    </Typography>
  );
};
