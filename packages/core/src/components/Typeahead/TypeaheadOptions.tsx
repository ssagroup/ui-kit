import React, { BaseSyntheticEvent } from 'react';
import { TypeaheadItemsListProps } from './types';
import { useTypeaheadContext } from './Typeahead.context';
import * as S from './styles';

export const TypeaheadOptions = ({
  ariaLabelledby,
  id,
  children,
  noItemsMessage = 'No matches found',
}: TypeaheadItemsListProps) => {
  const { optionsWithKey, handleChange, isMultiple, selectedItems } =
    useTypeaheadContext();

  const toggleItem = (value: string | number, isDisabled: boolean) => {
    if (!isDisabled) {
      handleChange(value);
    }
  };

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const filteredOptions = (childrenArray as React.ReactElement[]).filter(
    (child) => !selectedItems.includes(child.props.value),
  );
  const options = filteredOptions.map((child, index) => {
    const element = optionsWithKey[child.props.value];
    const isActive = selectedItems.includes(child.props.value);
    const isDisabled = Boolean(element?.isDisabled);
    return React.cloneElement(
      child,
      {
        ...child.props,
        isActive,
        isMultiple,
        key: `${child.props.key}-${id}-${index}`,
        id,
        'aria-selected': isActive,
        'aria-labelledby': ariaLabelledby,
        onClick: (event: BaseSyntheticEvent) => {
          event.preventDefault();
          toggleItem(child.props.value, isDisabled);
        },
      },
      <>{child.props.children || child.props.label || child.props.value}</>,
    );
  });

  if (options.length === 0) {
    options.push(<S.TypeaheadOption>{noItemsMessage}</S.TypeaheadOption>);
  }

  return <S.TypeaheadOptionsBase>{options}</S.TypeaheadOptionsBase>;
};