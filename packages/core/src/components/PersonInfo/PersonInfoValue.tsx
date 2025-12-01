import React from 'react';
import { Interpolation, Theme } from '@emotion/react';
import * as S from './styles';

interface PersonInfoValueProps {
  value: string;
  counter?: string | number;
  css?: Interpolation<Theme>;
  counterCss?: Interpolation<Theme>;
  link?: string;
  openLinkInNewTab?: boolean;
}

export const getLinkAttributes = (
  link?: string,
  openLinkInNewTab?: boolean,
) => {
  const isLink = Boolean(link);
  return isLink
    ? {
        as: 'a' as const,
        href: link,
        target: openLinkInNewTab ? '_blank' : undefined,
        rel: openLinkInNewTab ? 'noreferrer' : undefined,
      }
    : {};
};

export const PersonInfoValue: React.FC<PersonInfoValueProps> = ({
  value,
  counter,
  css,
  counterCss,
  link,
  openLinkInNewTab,
}) => {
  const isLink = Boolean(link);
  const linkAttributes = getLinkAttributes(link, openLinkInNewTab);

  return (
    <S.TextBase
      css={[isLink ? S.personInfoValueLinkStyles : undefined, css]}
      {...linkAttributes}>
      {value}
      {counter && <S.Counter css={counterCss}> {counter}</S.Counter>}
    </S.TextBase>
  );
};
