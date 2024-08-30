import * as S from '../styles';

export const NoOptions = ({ children }: React.PropsWithChildren) => (
  <S.TypeaheadOption>{children}</S.TypeaheadOption>
);
