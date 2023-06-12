import { css } from '@emotion/react';

import { Card, CardContent, CardHeader, Typography } from '@ssa-ui-kit/core';

/**
 *
 * UI Component shows a simple card with some notes
 */
export const Notes = () => (
  <Card
    css={css`
      box-shadow: 0px 10px 40px rgba(42, 48, 57, 0.08);
      border-radius: 20px;
      max-width: 195px;
    `}>
    <CardHeader>
      <Typography variant="h6" weight="bold">
        Notes
      </Typography>
    </CardHeader>

    <CardContent>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        eleifend, dui in commodo porttitor, neque metus lobortis sem, at
        suscipit arcu ligula non enim.
      </Typography>
    </CardContent>
  </Card>
);
