/**
 * PersonInfoValue - Primary value cell for PersonInfo, optionally a link.
 * When linkAttributes (from getLinkAttributes) are provided, renders as <a> with
 * personInfoValueLinkStyles: theme.colors.greyDarker, hover theme.colors.blue. Used by PersonInfoAvatar.
 */
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
