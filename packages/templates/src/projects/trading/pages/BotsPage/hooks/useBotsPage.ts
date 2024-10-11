import { useCallback, useEffect, useState } from 'react';
import { ButtonGroupItem } from '@ssa-ui-kit/core';
import { propOr, pathOr } from '@ssa-ui-kit/utils';
import { useCookie } from '@/trading/hooks';
import { SORT_ORDER_DESC, usePeriod } from '@/trading/contexts';
import { Enum, EnumsList } from '@/trading/types';
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
 * - fix applying Exchange/Strategy/Status dropdowns
 * - check mock, get rid of extra data, compress it (pair, instrument...)
 * - get rid of console.log
 * - clean up codebase
 * - mdx links change
 */
export const useBotsPage = () => {
  const { t } = useTranslation();
  const [response, setResponse] = useState<AllBots>({
    totalCount: 0,
    items: [],
  });

  const [totalCount, setTotalCount] = useState<number>(0);
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
    const Sorting = propOr<SearchType, string>('Name', 'Sorting')(queryParams);
    const isDescending = propOr<SearchType, boolean>(
      false,
      'Descending',
    )(queryParams);

    const sortedItems = allBotsMock.items.sort((item1, item2) => {
      if (
        ['currentlyInUsePercents', 'statistics.pnl', 'statistics.roi'].includes(
          Sorting,
        )
      ) {
        // number
        const item1Value = pathOr<SingleBot, number>(
          0,
          Sorting.split('.'),
        )(item1);
        const item2Value = pathOr<SingleBot, number>(
          0,
          Sorting.split('.'),
        )(item2);
        return isDescending ? item2Value - item1Value : item1Value - item2Value;
      } else {
        // string
        const item1Value = pathOr<SingleBot, string>(
          '',
          Sorting.split('.'),
        )(item1);
        const item2Value = pathOr<SingleBot, string>(
          '',
          Sorting.split('.'),
        )(item2);
        return isDescending
          ? item2Value.localeCompare(item1Value, undefined, { numeric: true })
          : item1Value.localeCompare(item2Value, undefined, { numeric: true });
      }
    });
    let filteredPageItems = sortedItems.filter((item) => {
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
    let newPageItems = filteredPageItems.slice(
      SkipCount,
      SkipCount + MaxResultCount,
    );

    newPageItems = newPageItems.map((item) => {
      switch (period.period) {
        case 'Current':
          return {
            ...item,
            currentlyInUsePercents: 78,
            statistics: {
              ...item.statistics,
              roi: -5.01,
              pnl: -0.050266,
            },
          };
        case 'Day':
          return {
            ...item,
            currentlyInUsePercents: 78,
            statistics: {
              ...item.statistics,
              roi: -5.01,
              pnl: -0.050191,
              pnlUp: true,
            },
          };
        case 'Week':
          return {
            ...item,
            currentlyInUsePercents: 78,
            statistics: {
              ...item.statistics,
              roi: -13.1,
              pnl: -0.13136,
              pnlUp: true,
            },
          };
        case 'Month':
          return {
            ...item,
            currentlyInUsePercents: 78,
            statistics: {
              ...item.statistics,
              roi: 0.14,
              pnl: 0.001395,
              pnlUp: true,
            },
          };
        case 'Year':
          return {
            ...item,
            currentlyInUsePercents: 80,
            statistics: {
              ...item.statistics,
              roi: 83,
              pnl: 0.82829,
              pnlUp: true,
            },
          };
        case 'AllTime':
          return {
            ...item,
            currentlyInUsePercents: 85,
            statistics: {
              ...item.statistics,
              roi: 85,
              pnl: 0.84193,
              pnlUp: true,
            },
          };
        default:
          return item;
      }
    });

    setResponse({
      items: newPageItems,
      totalCount: filteredPageItems.length,
    });
  }, [queryParams, period]);

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
