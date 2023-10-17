import { useFiltersContext } from '@components/Filters/FiltersContext';
import { TableFilters } from '..';

export const TableFiltersWrapper = () => {
  const data = useFiltersContext();
  return <TableFilters {...data} />;
};
