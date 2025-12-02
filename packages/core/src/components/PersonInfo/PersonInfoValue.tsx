import React from 'react';
import * as S from './styles';
import { PersonInfoValueProps } from './types';

export const PersonInfoValue: React.FC<PersonInfoValueProps> = ({
  value,
  css,
  linkAttributes,
}) => {
  const isLink = Boolean(linkAttributes?.href);

  return (
    <S.TextBase
      css={[isLink ? S.personInfoValueLinkStyles : undefined, css]}
      {...(linkAttributes ?? {})}>
      {value}
    </S.TextBase>
  );
};
