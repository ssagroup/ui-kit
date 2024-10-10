import { useCallback, useEffect, useState } from 'react';
import { ButtonGroupItem } from '@ssa-ui-kit/core';
import { propOr } from '@ssa-ui-kit/utils';
import { useCookie } from '@/trading/hooks';
import { SORT_ORDER_DESC, usePeriod } from '@/trading/contexts';
import { Enum, EnumsList } from '@/trading/types';
import { PERIOD_CURRENT } from '@/trading/constants';
import { ROWS_PER_PAGE_LIST, TableFooterProps } from '@/trading/components';
import { showSimpleToast } from '@/trading/utils';
import { useTranslation } from '@contexts';
import { useBotsPageEnums, useQueryParams } from '.';
import { DEFAULT_SORT } from '../components/BotsTable/consts';
import { API_KEY_TO_TITLE, makeFilters } from '../components/BotsFilters/utils';
import { FiltersData } from '../components/BotsFilters/types';
import { BotsTableProps } from '../components/BotsTable/types';
import { AllBots, allBotsMock, SingleBot } from '../__mock__/allBots';
import { buttonGroupItems } from '../components/BotsNavigation/consts';
import { SearchType } from '../types';

const DEFAULT_SELECTED_INDEX = 0;
const DEFAULT_PER_PAGE = ROWS_PER_PAGE_LIST[DEFAULT_SELECTED_INDEX].value;

/**
 * TODO:
 * - Current/24h/7d/30d/1y/All filter
 * -  -     Current
 * -  24h   Day
 * -  7d    Week
 * -  30d   Month
 * -  1y    Year
 * -  All   AllTime
 * - sorting by column header
 * - check mock, get rid of extra data, compress it (pair, instrument...)
 * - get rid of console.log
 * - clean up codebase
 * - fix applying Exchange/Strategy/Status dropdowns
 * - mdx links change
 */
export const useBotsPage = () => {
  const { t } = useTranslation();
  const [response, setResponse] = useState<AllBots>({
    totalCount: 0,
    items: [],
  });

  const [totalCount, setTotalCount] = useState<number>(0);
  const [lastItemsCount, setLastItemsCount] = useState<number>(0);
  const [filtersItems, setFiltersItems] = useState<FiltersData>({});
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [botsSortColumn, updateBotsSortColumnCookie] = useCookie(
    'botsSortColumn',
    DEFAULT_SORT.column,
  );
  const [botsSortOrder, updateBotsSortOrderCookie] = useCookie(
    'botsSortOrder',
    DEFAULT_SORT.order,
  );
  const [botsPerPage, updateBotsPerPageCookie] = useCookie(
    'botsPerPage',
    DEFAULT_PER_PAGE.toString(),
  );
  const [selectedGroupItem, setSelectedGroupItem] = useState<
    ButtonGroupItem | undefined
  >(buttonGroupItems[0]);
  const [perPage, setPerPage] = useState<number>(Number(botsPerPage));

  const { period } = usePeriod();
  const currentPeriod = period.period === PERIOD_CURRENT ? null : period;

  const enumsData = useBotsPageEnums();

  const { queryParams, pagesCount, changeParams, resetFilters } =
    useQueryParams({
      initParams: {
        MaxResultCount: perPage,
        Sorting: botsSortColumn,
        Descending: botsSortOrder === SORT_ORDER_DESC,
      },
      perPage,
      totalCount,
    });

  useEffect(() => {
    changeParams(
      {
        Keyword: searchTerm,
      },
      searchTerm !== queryParams.Keyword,
    );
  }, [searchTerm]);

  useEffect(() => {
    setFiltersItems(
      makeFiltersMemo(
        API_KEY_TO_TITLE,
        enumsData as unknown as Record<EnumsList, Enum[]>,
        queryParams.RunState,
      ),
    );
  }, [queryParams.RunState]);

  useEffect(() => {
    setTotalCount(response.totalCount);
  }, [response.totalCount]);

  useEffect(() => {
    setLastItemsCount(response.items.length);
  }, [response.items.length]);

  useEffect(() => {
    // TODO: use also filtered values!!!
    console.log('>>>filter out with query params', queryParams);
    const MaxResultCount = propOr<SearchType, number>(
      DEFAULT_PER_PAGE,
      'MaxResultCount',
    )(queryParams);
    const SkipCount = propOr<SearchType, number>(0, 'SkipCount')(queryParams);
    const RunState = propOr<SearchType, 'All' | 'Running' | 'Stopped'>(
      'All',
      'RunState',
    )(queryParams);
    const Keyword = propOr<SearchType, null | string>(
      null,
      'Keyword',
    )(queryParams);
    let filteredPageItems = allBotsMock.items.filter((item) => {
      if (RunState === 'All') {
        return true;
      } else {
        return item.status === RunState;
      }
    });
    filteredPageItems = filteredPageItems.filter((bot) => {
      const checkResult: Array<boolean> = [];
      ['platform', 'strategy', 'status'].forEach((filterName) => {
        const filterValue = propOr<SearchType, string[]>(
          [],
          filterName,
        )(queryParams);
        const botPropValue = propOr<SingleBot, string>('', filterName)(bot);
        if (filterValue.length > 0) {
          checkResult.push(filterValue.includes(botPropValue));
        }
      });
      return checkResult.length === 0 || checkResult.every(Boolean);
    });
    if (Keyword) {
      filteredPageItems = filteredPageItems.filter((item) => {
        const keywordLower = Keyword.toLowerCase();
        const name = item.name.toLowerCase();
        return name.indexOf(keywordLower) > -1;
      });
    }
    const newPageItems = filteredPageItems.slice(
      SkipCount,
      SkipCount + MaxResultCount,
    );
    setResponse({
      items: newPageItems,
      totalCount: filteredPageItems.length,
    });
  }, [queryParams]);

  const makeFiltersMemo = useCallback(makeFilters, [
    enumsData,
    queryParams.RunState,
  ]);

  const handleSearchTerm = (searchTerm: string | null) => {
    setSearchTerm(searchTerm);
  };

  const handleFiltersSubmit = (newSubmitData: Record<string, string[]>) => {
    changeParams(newSubmitData, true);
  };

  const handleRowsPerPageChange: TableFooterProps['handleRowsPerPageChange'] =
    ({ value }) => {
      setPerPage(value as number);
      updateBotsPerPageCookie(value.toString());
    };

  const handleSortingChange: BotsTableProps['handleSortingChange'] = (
    sortInfo,
  ) => {
    updateBotsSortColumnCookie(sortInfo.column);
    updateBotsSortOrderCookie(sortInfo.order);
    changeParams({
      Sorting: sortInfo.column,
      Descending: sortInfo.order === SORT_ORDER_DESC,
    });
  };

  const handleRunStateClick = (groupItem: ButtonGroupItem) => {
    const newGroupItem = buttonGroupItems.find(
      (item) => item.id === groupItem.id,
    );
    setSelectedGroupItem(newGroupItem);

    const { text } = groupItem;
    const currentRunState = propOr<SearchType, string>(
      'All',
      'RunState',
    )(queryParams);
    if (text !== currentRunState) {
      changeParams(
        {
          RunState: text,
          ShowArchive: null,
        },
        true,
      );
      setFiltersItems(
        makeFilters(
          API_KEY_TO_TITLE,
          enumsData as unknown as Record<EnumsList, Enum[]>,
          text,
        ),
      );
    }
  };

  const handleArchiveButtonClick = () => {
    showSimpleToast(t('toasts.archive.progress'), {
      hideProgressBar: true,
    });
    setTimeout(() => {
      showSimpleToast(t('toasts.archive.success'), {
        type: 'success',
      });
    }, 1000);
  };

  return {
    selectedGroupItem,
    filtersItems,
    response,
    pagesCount,
    botsPerPage,
    resetFilters,
    handleSortingChange,
    handleRunStateClick,
    handleArchiveButtonClick,
    handleFiltersSubmit,
    handleSearchTerm,
    handleRowsPerPageChange,
  };
};
