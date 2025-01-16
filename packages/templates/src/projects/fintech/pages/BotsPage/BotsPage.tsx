import React from 'react';
import { css } from '@emotion/react';
import { WithVisibleMD, WithVisibleSM } from '@ssa-ui-kit/core';
import { WithPagination } from '@ssa-ui-kit/core';
import { useHeader } from '@fintech/contexts';
import { TableFooter } from '@fintech/components';
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
    handleFiltersSubmit,
    handleSearchTerm,
    handleRowsPerPageChange,
  } = useBotsPage();

  return (
    <>
      {
        <BotsNavigationMD
          handleRunStateClick={handleRunStateClick}
          externalState={selectedGroupItem}
        />
      }
      {renderHeaderContent(
        <BotsNavigationSM
          handleRunStateClick={handleRunStateClick}
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
