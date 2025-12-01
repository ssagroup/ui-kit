import React from 'react';
import Avatar from '@components/Avatar';
import * as S from './styles';
import { PersonInfoAvatarProps } from './types';
import { PersonInfoValue } from './PersonInfoValue';
import { getLinkAttributes } from './helpers';

export const PersonInfoAvatar: React.FC<PersonInfoAvatarProps> = ({
  avatar,
  value,
  styles,
  link,
  openLinkInNewTab,
}) => {
  const hasAvatar = Boolean(avatar);
  const hasValue = Boolean(value);
  const isLink = Boolean(link);
  const linkAttributes = getLinkAttributes(link, openLinkInNewTab);

  if (!hasAvatar && !hasValue) return null;

  const valueNode = hasValue ? (
    <PersonInfoValue
      value={value as string}
      css={hasAvatar ? styles?.avatarName : styles?.value}
      linkAttributes={!hasAvatar ? linkAttributes : undefined}
    />
  ) : null;

  if (!hasAvatar) {
    return valueNode;
  }

  return (
    <S.AvatarWrapper
      css={isLink ? S.avatarWrapperLinkStyles : undefined}
      {...linkAttributes}>
      <Avatar size={24} image={avatar!} />
      {valueNode}
    </S.AvatarWrapper>
  );
};
