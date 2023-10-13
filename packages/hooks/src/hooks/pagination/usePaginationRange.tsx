import { useMemo } from 'react';
import { IUsePaginationRangeProps } from './types';
import { generateRange } from '@ssa-ui-kit/utils';

const usePaginationRange = ({
  pagesCount,
  selectedPage,
}: IUsePaginationRangeProps) => {
  return useMemo(
    () => generateRange(pagesCount, selectedPage),
    [pagesCount, selectedPage],
  );
};

export { usePaginationRange };
