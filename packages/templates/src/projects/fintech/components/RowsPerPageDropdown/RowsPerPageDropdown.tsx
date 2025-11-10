import { useTheme } from '@emotion/react';

import {
  Dropdown,
  DropdownOption,
  Typography,
  Wrapper,
} from '@ssa-ui-kit/core';

import { useTranslation } from '@contexts';

import { ROWS_PER_PAGE_LIST } from './constants';
import { RowsPerPageDropdownProps } from './types';

export const RowsPerPageDropdown = ({
  onChange,
  selectedItem = ROWS_PER_PAGE_LIST[1].value,
  ...rest
}: RowsPerPageDropdownProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const selectedItemForDropdown =
    ROWS_PER_PAGE_LIST.find(({ value }) => value === selectedItem) ||
    ROWS_PER_PAGE_LIST[0];

  return (
    <Wrapper css={{ width: 'auto', ul: { width: 'auto' } }}>
      <Typography
        variant="subtitle"
        css={{
          fontSize: 12,
          lineHeight: 1,
          [theme.mediaQueries.md]: {
            fontSize: 14,
          },
        }}>
        {t('rowsPerPage.text')}:
      </Typography>
      <Dropdown
        selectedItem={selectedItemForDropdown}
        onChange={onChange}
        css={{
          marginLeft: 10,
          background: 'none',
          color: '#070821',
          gap: 5,
          padding: 0,
          '&:focus': {
            color: '#070821',
            background: 'none',
            '&::before': {
              display: 'none',
            },
          },
          '& svg path': {
            stroke: theme.colors.greyDarker,
          },

          [theme.mediaQueries.md]: {
            marginRight: 37,
          },
        }}
        {...rest}>
        {ROWS_PER_PAGE_LIST.map((item) => (
          <DropdownOption key={item.id} value={item.value}>
            {item.value}
          </DropdownOption>
        ))}
      </Dropdown>
    </Wrapper>
  );
};
