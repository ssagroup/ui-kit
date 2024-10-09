import { useCallback, useEffect, useRef, useState, MouseEvent } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import {
  ButtonGroupItem,
  WithVisibleMD,
  WithVisibleSM,
} from '@ssa-ui-kit/core';
import { WithPagination } from '@ssa-ui-kit/core';
import { propOr } from '@ssa-ui-kit/utils';
import { useCookie } from '@trading/hooks';
import { BalanceCoin, Bot, Enum, EnumsList } from '@trading/types';
import {
  SORT_ORDER_DESC,
  useBots,
  useCurrency,
  useHeader,
  usePeriod,
} from '@trading/contexts';
import {
  TableFooter,
  TableFooterProps,
  ROWS_PER_PAGE_LIST,
} from '@trading/components';
import { PERIOD_CURRENT } from '@trading/constants';
import { BotsNavigation, BotsFilters, BotsTable } from './components';
import { createMockData } from './mockData';
import { useQueryParams } from './hooks/useQueryParams';
import { useBotsPageEnums } from './hooks/useBotsPageEnums';
import { BotsTableProps } from './components/BotsTable/types';
import { API_KEY_TO_TITLE, makeFilters } from './components/BotsFilters/utils';
import { FiltersData } from './components/BotsFilters/types';
import { SearchType } from './types';
import { DEFAULT_SORT } from './components/BotsTable/consts';
import { buttonGroupItems } from './components/BotsNavigation/consts';

const COMMON_PARAMS_FOR_RESET = {
  ShowArchive: null,
};

const BotsNavigationSM = WithVisibleSM(
  BotsNavigation,
  css`
    margin-left: auto;
  `,
);
const BotsNavigationMD = WithVisibleMD(BotsNavigation);

const DEFAULT_SELECTED_INDEX = 0;
const DEFAULT_PER_PAGE = ROWS_PER_PAGE_LIST[DEFAULT_SELECTED_INDEX].value;

const BotsPageComponent = () => {
  const lastCurrency = useRef<BalanceCoin>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [filtersItems, setFiltersItems] = useState<FiltersData>({});
  const [lastItemsCount, setLastItemsCount] = useState<number>(0);
  const [selectedGroupItem, setSelectedGroupItem] = useState<
    ButtonGroupItem | undefined
  >(buttonGroupItems[0]);
  const { resetReloadReason } = useBots();
  const { currency } = useCurrency();
  const { renderHeaderContent } = useHeader();
  const { period } = usePeriod();
  const navigate = useNavigate();
  const match = useMatches();
  const [botsPerPage, updateBotsPerPageCookie] = useCookie(
    'botsPerPage',
    DEFAULT_PER_PAGE.toString(),
  );
  const [botsSortColumn, updateBotsSortColumnCookie] = useCookie(
    'botsSortColumn',
    DEFAULT_SORT.column,
  );
  const [botsSortOrder, updateBotsSortOrderCookie] = useCookie(
    'botsSortOrder',
    DEFAULT_SORT.order,
  );
  const [perPage, setPerPage] = useState<number>(Number(botsPerPage));

  const isArchivePage = match[match.length - 1].pathname.includes('/archive');

  const allRowsDisabled = isArchivePage;
  const showNavigation = !isArchivePage;

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

  const currentPeriod = period.period === PERIOD_CURRENT ? null : period;

  const botsResponse = useQuery({
    queryKey: ['bots', queryParams, period],
    initialData: createMockData(lastItemsCount, totalCount),
    queryFn: API.Bots.getAll.bind(null, {
      ...queryParams,
      Period: currentPeriod?.period,
    }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    meta: {
      name: 'botsList',
    },
  });
  const enumsResponse = useBotsPageEnums();
  const enumsData = propOr<typeof enumsResponse, Record<EnumsList, Enum[]>>(
    {},
    'data',
  )(enumsResponse);

  const makeFiltersMemo = useCallback(makeFilters, [
    enumsData,
    queryParams.RunState,
  ]);

  useEffect(() => {
    botsResponse.refetch();
  }, []);

  useEffect(() => {
    setTotalCount(botsResponse.data.result.totalCount);
  }, [botsResponse.data.result.totalCount]);

  useEffect(() => {
    setLastItemsCount(botsResponse.data.result.items.length);
  }, [botsResponse.data.result.items.length]);

  useEffect(() => {
    resetReloadReason();
  }, [botsResponse.isFetched]);

  useEffect(() => {
    lastCurrency.current = currency;
  }, [currency]);

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
      makeFiltersMemo(API_KEY_TO_TITLE, enumsData, queryParams.RunState),
    );
  }, [enumsData, queryParams.RunState]);

  useEffect(() => {
    resetFilters();
    if (isArchivePage) {
      changeParams(
        {
          ...COMMON_PARAMS_FOR_RESET,
          RunState: null,
          ShowArchive: true,
        },
        true,
      );
    } else {
      changeParams(
        {
          ...COMMON_PARAMS_FOR_RESET,
          RunState: 'All',
        },
        true,
      );
      setFiltersItems(makeFilters(API_KEY_TO_TITLE, enumsData, 'All'));
    }
  }, [isArchivePage]);

  const handleSearchTerm = (searchTerm: string | null) => {
    setSearchTerm(searchTerm);
  };

  const handleFiltersSubmit = (newSubmitData: Record<string, string[]>) => {
    changeParams(newSubmitData, true);
  };

  const handleRowClick =
    (row: Bot) => (event: MouseEvent<HTMLTableRowElement>) => {
      event.preventDefault();
      if (!allRowsDisabled) {
        navigate(`${row.id}/information`, {
          relative: 'path',
        });
      }
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
      setFiltersItems(makeFilters(API_KEY_TO_TITLE, enumsData, text));
    }
  };

  const handleArchiveButtonClick = () => {
    setSelectedGroupItem(buttonGroupItems[0]);
    navigate('archive', { relative: 'path' });
  };

  return (
    <>
      {showNavigation && (
        <BotsNavigationMD
          handleRunStateClick={handleRunStateClick}
          handleArchiveButtonClick={handleArchiveButtonClick}
          externalState={selectedGroupItem}
        />
      )}
      {showNavigation &&
        renderHeaderContent(
          <BotsNavigationSM
            handleRunStateClick={handleRunStateClick}
            handleArchiveButtonClick={handleArchiveButtonClick}
            externalState={selectedGroupItem}
          />,
        )}
      <BotsFilters
        handleFiltersSubmit={handleFiltersSubmit}
        handleFiltersClear={resetFilters}
        setSearchTerm={handleSearchTerm}
        filterItems={filtersItems}
        updatedCheckboxData={filtersItems}
      />
      <BotsTable
        botsResponse={botsResponse}
        allRowsDisabled={allRowsDisabled}
        onRowClick={handleRowClick}
        handleSortingChange={handleSortingChange}
      />
      {!!botsResponse.data.result.totalCount && (
        <TableFooter
          handleRowsPerPageChange={handleRowsPerPageChange}
          pagesCount={pagesCount}
          selectedItem={Number(botsPerPage)}
        />
      )}
    </>
  );
};

export const BotsPage = WithPagination(BotsPageComponent);
