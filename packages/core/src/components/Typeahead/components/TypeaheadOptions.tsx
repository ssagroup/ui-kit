import React from 'react';
import { NoOptions } from './NoOptions';
import { TypeaheadOption } from './TypeaheadOption';
import { TypeaheadItemsListProps } from '../types';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

export const TypeaheadOptions = ({
  noItemsMessage = 'No matches found',
  children,
}: TypeaheadItemsListProps) => {
  const context = useTypeaheadContext();

  const createCustomOption = (
    value: string | number,
    isActive: boolean,
    key: string,
  ) => (
    <TypeaheadOption
      key={key}
      value={value}
      label={value}
      isCustomValue
      isActive={isActive}
      role="option"
      aria-selected={isActive}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!context.isDisabled) {
          context.handleChange({
            value,
            shouldClose: !context.isMultiple,
          });
        }
      }}>
      {value}
    </TypeaheadOption>
  );

  const selectedCustomValues = context.selectedItems.filter(
    (item) => !context.optionsWithKey[item],
  );

  const selectedCustomOptions = selectedCustomValues.map((value) =>
    createCustomOption(value, true, `typeahead-selected-custom-${value}`),
  );

  const hasTypedCustomValue =
    context.customOptionValue &&
    !context.selectedItems.includes(context.customOptionValue);

  const typedCustomOption = hasTypedCustomValue
    ? createCustomOption(
        context.customOptionValue!,
        false,
        'typeahead-custom-value',
      )
    : null;

  const hasNoOptions =
    !context.options?.length &&
    React.Children.toArray(children).filter(Boolean).length === 0;

  const noOptionsFallback = hasNoOptions ? (
    <NoOptions key="no-items" aria-selected={false}>
      {noItemsMessage}
    </NoOptions>
  ) : null;

  const options = [
    ...selectedCustomOptions,
    typedCustomOption,
    ...(context.options || []),
    noOptionsFallback,
  ].filter(Boolean);

  return (
    <S.TypeaheadOptionsBase role="listbox">{options}</S.TypeaheadOptionsBase>
  );
};
