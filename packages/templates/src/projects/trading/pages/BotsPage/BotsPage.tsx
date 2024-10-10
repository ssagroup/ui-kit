import React from 'react';
import { css } from '@emotion/react';
import { WithVisibleMD, WithVisibleSM } from '@ssa-ui-kit/core';
import { WithPagination } from '@ssa-ui-kit/core';
import { useHeader } from '@trading/contexts';
import { TableFooter } from '@trading/components';
import { BotsNavigation, BotsFilters, BotsTable } from './components';
import { useBotsPage } from './hooks';

const BotsNavigationSM = WithVisibleSM(
  BotsNavigation,
  css`
    margin-left: auto;
  `,
);
const BotsNavigationMD = WithVisibleMD(BotsNavigation);

const BotsPageComponent = () => {
  const { renderHeaderContent } = useHeader();

  const {
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
  } = useBotsPage();

  return (
    <>
      {
        <BotsNavigationMD
          handleRunStateClick={handleRunStateClick}
          handleArchiveButtonClick={handleArchiveButtonClick}
          externalState={selectedGroupItem}
        />
      }
      {renderHeaderContent(
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
        response={response}
        handleSortingChange={handleSortingChange}
      />
      {!!response.totalCount && (
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
