import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePaginationContext } from '@ssa-ui-kit/core';
import { SORT_ORDER_ASC, SORT_ORDER_DESC, useTable } from '@fintech/contexts';
import { SearchType } from '../types';
import { DEFAULT_SORT } from '../components/BotsTable/consts';
import { UseQueryParams } from '.';

const getNonNullableParams = (params: SearchType) => {
  const filteredParams: SearchType = {};
  Object.keys(params).forEach((newParamKey) => {
    const newValue = params[newParamKey];
    if (!newValue || (Array.isArray(newValue) && newValue.length === 0)) {
      return;
    }
    if (Array.isArray(newValue) && newValue.length > 0) {
      filteredParams[newParamKey] = params[newParamKey];
      return;
    }
    if (params[newParamKey] !== null) {
      filteredParams[newParamKey] = params[newParamKey];
    }
  });
  return filteredParams;
};

const getRunState = (currentValue: SearchType[0], newValue: SearchType[0]) => {
  return newValue === 'All' || undefined
    ? null
    : typeof newValue === 'string'
      ? newValue
      : currentValue;
};

export const useQueryParams = ({
  initParams,
  perPage,
  totalCount,
}: UseQueryParams) => {
  const { page, setPage } = usePaginationContext();
  const { setSortColumn, setSortOrder } = useTable();
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<SearchType>(initParams);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [pagesCount, setPageCount] = useState<number>(0);

  const resetFilters = () => {
    setPage(1);
    const filters = getCleanedFilters({});
    setQueryParams(filters);
  };

  const getCleanedFilters = (newParams: SearchType) => {
    const newRunState = getRunState(queryParams.RunState, newParams.RunState);

    const newParamsLocal: SearchType = {
      ...newParams,
      RunState: newRunState,
    };
    const allParams = {
      ...queryParams,
      ...newParamsLocal,
    };
    return getNonNullableParams({
      RunState: allParams.RunState,
      MaxResultCount: allParams.MaxResultCount,
      Sorting: allParams.Sorting,
      Descending: allParams.Descending,
      Keyword: allParams.Keyword,
    });
  };

  const changeParams = (newParams: SearchType, resetPage?: boolean) => {
    let filteredParams: SearchType;
    const newRunState = getRunState(queryParams.RunState, newParams.RunState);

    const newParamsLocal: SearchType = {
      ...newParams,
      RunState: newRunState,
    };

    if (
      newParamsLocal.RunState === queryParams.RunState ||
      newParamsLocal.ShowArchive
    ) {
      const props = {
        ...queryParams,
        ...newParamsLocal,
      };

      filteredParams = getNonNullableParams({
        ...props,
        RunState: newParamsLocal.ShowArchive ? null : props.RunState,
      });
    } else {
      filteredParams = getCleanedFilters(newParams);
    }

    if (resetPage) {
      setPage(1);
    }

    if (JSON.stringify(queryParams) !== JSON.stringify(filteredParams)) {
      setQueryParams(filteredParams);
    }
  };

  useEffect(() => {
    const searchParamKeyword = searchParams.get('Keyword');
    if (searchParamKeyword) {
      changeParams({
        Keyword: searchParamKeyword,
      });
    }
  }, []);

  useEffect(() => {
    const skipCount = ((page || 1) - 1) * perPage;
    changeParams({
      SkipCount: skipCount,
      MaxResultCount: perPage,
    });
  }, [page]);

  useEffect(() => {
    if (page === 1) {
      changeParams({
        MaxResultCount: perPage,
      });
    } else {
      setPage(1);
    }
  }, [perPage]);

  useEffect(() => {
    setIsLastPage(totalCount / (page || 1) < perPage);
    setPageCount(totalCount ? Math.ceil(totalCount / perPage) : 1);
  }, [page, perPage, totalCount]);

  useEffect(() => {
    const newSortColumn =
      queryParams.Sorting === DEFAULT_SORT.column
        ? DEFAULT_SORT.column
        : (queryParams.Sorting as string | undefined);
    setSortColumn(newSortColumn);
    setSortOrder(queryParams.Descending ? SORT_ORDER_DESC : SORT_ORDER_ASC);
  }, [queryParams.Sorting, queryParams.Descending]);

  return {
    queryParams,
    isLastPage,
    pagesCount,
    changeParams,
    resetFilters,
  };
};
