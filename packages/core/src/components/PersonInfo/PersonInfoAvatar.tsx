import React from 'react';
import Avatar from '@components/Avatar';
import * as S from './styles';
import { PersonInfoStyles } from './types';
import { PersonInfoValue, getLinkAttributes } from './PersonInfoValue';

interface PersonInfoAvatarProps {
  avatar?: string;
  value?: string;
  counter?: string | number;
  styles?: PersonInfoStyles;
  link?: string;
  openLinkInNewTab?: boolean;
}

export const PersonInfoAvatar: React.FC<PersonInfoAvatarProps> = ({
  avatar,
  value,
  counter,
  styles,
  link,
  openLinkInNewTab,
}) => {
  const hasAvatar = Boolean(avatar);
  const hasValue = Boolean(value);

  if (!hasAvatar && !hasValue) return null;

  const valueNode = hasValue ? (
    <PersonInfoValue
      value={value as string}
      counter={counter}
      css={hasAvatar ? styles?.avatarName : styles?.value}
      counterCss={styles?.counter}
      link={!hasAvatar ? link : undefined}
      openLinkInNewTab={!hasAvatar ? openLinkInNewTab : undefined}
    />
  ) : null;

  if (!hasAvatar) {
    return valueNode;
  }

  const isLink = Boolean(link);
  const linkAttributes = getLinkAttributes(link, openLinkInNewTab);

  return (
    <S.AvatarWrapper
      css={isLink ? S.avatarWrapperLinkStyles : undefined}
      {...linkAttributes}>
      <Avatar size={24} image={avatar!} />
      {valueNode}
    </S.AvatarWrapper>
  );
};
