import { type HTMLAttributes } from 'react';

import styled from '@emotion/styled';

const FiltersMultiSelectEmptyBase = styled.div`
  padding: 12px;
  text-align: center;

  font-weight: 500;
  font-size: 13.33px;
`;

export interface FiltersMultiSelectEmptyProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const FiltersMultiSelectEmpty = ({
  children,
  ...props
}: FiltersMultiSelectEmptyProps) => (
  <FiltersMultiSelectEmptyBase {...props}>
    {children}
  </FiltersMultiSelectEmptyBase>
);
