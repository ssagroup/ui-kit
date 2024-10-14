import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { Wrapper } from '@ssa-ui-kit/core';
import { Filters, SearchBox } from '@ssa-ui-kit/core';
import { usePeriod } from '@trading/contexts';
import { BotPeriodFilter } from '@trading/components';
import { BotsFiltersProps } from './types';
import * as S from './styles';

export const BotsFilters = ({
  handleFiltersSubmit,
  handleFiltersClear,
  setSearchTerm,
  searchTerm,
  filterItems,
  updatedCheckboxData,
}: BotsFiltersProps) => {
  const { register, resetField, setValue, control } = useForm<FieldValues>();
  const { period, setPeriod } = usePeriod();
  const { pathname } = useLocation();
  const handleClear = () => {
    resetField('search');
    handleFiltersClear();
  };

  useEffect(() => {
    if (!searchTerm) {
      resetField('search');
    }
  }, [updatedCheckboxData]);

  useEffect(() => {
    if (searchTerm) {
      setValue('search', searchTerm);
    }
  }, [searchTerm]);

  return (
    <div css={S.FiltersWrapper}>
      <Wrapper css={S.Filters}>
        <SearchBox
          register={register}
          control={control}
          resetField={resetField}
          callback={setSearchTerm}
          name={'search'}
          inputProps={{
            autoComplete: 'off',
          }}
          css={S.SearchBox}
        />
        <Filters
          handleSubmit={handleFiltersSubmit}
          checkboxData={filterItems}
          updatedCheckboxData={updatedCheckboxData}
          handleClear={handleClear}
        />
      </Wrapper>
      {!pathname.includes('nocontrol') && (
        <div data-testid="period-switcher" css={S.PeriodSwitcher}>
          <BotPeriodFilter
            onClick={setPeriod}
            buttonStyles={S.PeriodSwitcherBtn}
            period={period}
          />
        </div>
      )}
    </div>
  );
};
