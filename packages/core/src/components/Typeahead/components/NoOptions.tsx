import * as S from '../styles';

export const NoOptions = ({ children, ...rest }: React.PropsWithChildren) => (
  <S.TypeaheadOption {...rest} role="option">
    {children}
  </S.TypeaheadOption>
);
