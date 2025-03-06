import React, { type HTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { useFiltersMultiSelectContext } from '../FiltersMultiSelectProvider';

const FiltersMultiselectOptionsBase = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};

  border-radius: 8px;
  overflow: hidden;
  box-shadow: -4px 4px 14px 0 ${({ theme }) => theme.colors.greyDarker14};
`;

export const FiltersMultiSelectOptions = ({
  children,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  const ctx = useFiltersMultiSelectContext();

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return (
    <FiltersMultiselectOptionsBase role="listbox" {...props}>
      {childrenArray.length ? childrenArray : ctx.emptyNode}
    </FiltersMultiselectOptionsBase>
  );
};
