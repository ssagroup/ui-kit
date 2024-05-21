import { useMemo } from 'react';
import { generateRange } from '@ssa-ui-kit/utils';
import { UsePaginationRangeProps } from './types';

const usePaginationRange = ({
  pagesCount,
  selectedPage,
}: UsePaginationRangeProps) => {
  return useMemo(
    () => generateRange(pagesCount, selectedPage),
    [pagesCount, selectedPage],
  );
};

export { usePaginationRange };
