import React from 'react';

import * as S from '../styles';
import { useTypeaheadContext } from '../Typeahead.context';
import { TypeaheadItemsListProps } from '../types';

import { NoOptions } from './NoOptions';

export const TypeaheadOptions = ({
  noItemsMessage = 'No matches found',
  children,
}: TypeaheadItemsListProps) => {
  const context = useTypeaheadContext();
  let options = context.options || [];

  if (React.Children.toArray(children).filter(Boolean).length === 0) {
    options = [
      <NoOptions key={'no-items'} aria-selected={false}>
        {noItemsMessage}
      </NoOptions>,
    ];
  }

  return (
    <S.TypeaheadOptionsBase role="listbox">{options}</S.TypeaheadOptionsBase>
  );
};
