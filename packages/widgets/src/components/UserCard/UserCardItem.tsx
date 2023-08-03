import { Theme, css } from '@emotion/react';

import { Typography, Wrapper } from '@ssa-ui-kit/core';

const cardShadow = (theme: Theme) => css`
  display: flex;

  width: 92px;
  height: 68px;

  align-items: center;
  flex-flow: column;
  justify-content: center;

  background: ${theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(42, 48, 57, 0.08);
`;

interface UserCardItemProps {
  value: string | number;
  unit: string;
  caption: string;
}

const UserCardItem = ({ value, unit, caption }: UserCardItemProps) => (
  <div css={cardShadow}>
    <Wrapper
      css={css`
        align-items: baseline;
        justify-content: center;
      `}>
      <Typography variant="h4" weight="bold">
        {value}
      </Typography>
      <Typography variant="subtitle">{unit}</Typography>
    </Wrapper>
    <Typography variant="subtitle">{caption}</Typography>
  </div>
);

export default UserCardItem;
