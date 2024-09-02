import { NoOptions } from './NoOptions';
import { TypeaheadItemsListProps } from '../types';
import { useTypeaheadContext } from '../Typeahead.context';
import * as S from '../styles';

export const TypeaheadOptions = ({
  noItemsMessage = 'No matches found',
}: TypeaheadItemsListProps) => {
  const { options: contextOptions } = useTypeaheadContext();
  const options = contextOptions || [];

  if (options.length === 0) {
    options.push(<NoOptions key={'no-items'}>{noItemsMessage}</NoOptions>);
  }

  return <S.TypeaheadOptionsBase>{options}</S.TypeaheadOptionsBase>;
};
