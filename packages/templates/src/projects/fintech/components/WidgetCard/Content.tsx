import type { ComponentProps } from 'react';
import styled, { type StyledComponent } from '@emotion/styled';
import { CardContent } from '@ssa-ui-kit/core';

// Explicit annotation: without it the inferred type names core's internal dist
// path, which is not portable in the emitted declarations (TS2742).
export const Content: StyledComponent<ComponentProps<typeof CardContent>> =
  styled(CardContent)`
    max-width: 406px;
    width: 100%;
    display: block;
  `;
