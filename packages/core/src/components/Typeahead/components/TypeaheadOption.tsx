import * as S from '../styles';
import { TypeaheadItemProps } from '../types';
import Icon from '@components/Icon';

export const TypeaheadOption = ({ children, ...rest }: TypeaheadItemProps) => (
  <S.TypeaheadOption {...rest}>
    {children}{' '}
    {rest.isActive && (
      <Icon name="check" size={10} css={{ marginLeft: 'auto' }} />
    )}
  </S.TypeaheadOption>
);
