import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';
import {
  Badge,
  Icon,
  Wrapper,
  MultipleDropdown,
  DropdownOption,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@ssa-ui-kit/core';
import { PaginationContextProvider, Pagination } from '@components/Pagination';
import { TableFilters } from '@components/TableFilters';
import {
  mockData,
  mockInitialState,
} from '@components/TableFilters/stories/mockData';
import {
  mockExchangeItems,
  mockPairsItems,
  mockStatusItems,
  mockStrategyItems,
} from './mockData';
import { CheckboxData } from '@components/TableFilters/types';

export default {
  title: 'Widgets/Table',
  component: Table,
} as Meta<typeof Table>;

export const Main = () => {
  const selectedPage = 5;
  const pagesCount = 10;
  const onFilterSubmit = (checkboxData: CheckboxData) => {
    console.log('>>>onSubmit', checkboxData);
  };
  // Big display? Hide More button
  // Use media query / javascript match media (?)
  return (
    <Wrapper direction={'column'}>
      <Wrapper
        css={{
          justifyContent: 'right',
        }}>
        <MultipleDropdown label="Exchange">
          {mockExchangeItems.map((item) => (
            <DropdownOption key={item.value} value={item.value}>
              {item.label}
            </DropdownOption>
          ))}
        </MultipleDropdown>
        <MultipleDropdown label="Status">
          {mockStatusItems.map((item) => (
            <DropdownOption key={item.value} value={item.value}>
              {item.label}
            </DropdownOption>
          ))}
        </MultipleDropdown>
        <MultipleDropdown label="Pair">
          {mockPairsItems.map((item) => (
            <DropdownOption key={item.value} value={item.value}>
              {item.label}
            </DropdownOption>
          ))}
        </MultipleDropdown>
        <MultipleDropdown label="Strategy">
          {mockStrategyItems.map((item) => (
            <DropdownOption key={item.value} value={item.value}>
              {item.label}
            </DropdownOption>
          ))}
        </MultipleDropdown>
        <TableFilters
          data={mockData}
          initialState={mockInitialState}
          handleSubmit={onFilterSubmit}
        />
      </Wrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Col</TableCell>
            <TableCell>
              <Wrapper
                css={css`
                  svg {
                    margin-right: 10px;
                  }
                `}>
                <Icon name="calendar" size={16} />
                Col
              </Wrapper>
            </TableCell>
            <TableCell align="center">Col 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>
              <Badge>Row</Badge>
            </TableCell>
            <TableCell align="center">Row</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
            <TableCell>
              <Badge color="green">Row 2</Badge>
            </TableCell>
            <TableCell align="center">Row 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <PaginationContextProvider selectedPage={selectedPage}>
        <Pagination pagesCount={pagesCount} />
      </PaginationContextProvider>
    </Wrapper>
  );
};
