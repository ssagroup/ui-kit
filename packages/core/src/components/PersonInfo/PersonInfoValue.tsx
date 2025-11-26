import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import * as S from './styles';

interface PersonInfoValueProps {
  value: string;
  counter?: string | number;
  css?: Interpolation<Theme>;
  counterCss?: Interpolation<Theme>;
}

export const PersonInfoValue: React.FC<PersonInfoValueProps> = ({
  value,
  counter,
  css,
  counterCss,
}) => {
  return (
    <S.TextBase css={css}>
      {value}
      {counter && <S.Counter css={counterCss}> {counter}</S.Counter>}
    </S.TextBase>
  );
};
