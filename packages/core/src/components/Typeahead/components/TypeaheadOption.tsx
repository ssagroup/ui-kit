import Icon from '@components/Icon';
import * as S from '../styles';
import { TypeaheadItemProps } from '../types';

export const TypeaheadOption = ({ children, ...rest }: TypeaheadItemProps) => (
  <S.TypeaheadOption {...rest}>
    {children}{' '}
    {rest.isActive && (
      <Icon name="check" size={10} css={{ marginLeft: 'auto', minWidth: 10 }} />
    )}
  </S.TypeaheadOption>
);
