import React from 'react';
import Avatar from '@components/Avatar';
import * as S from './styles';
import { PersonInfoStyles } from './types';
import { PersonInfoValue } from './PersonInfoValue';

interface PersonInfoAvatarProps {
  avatar: string;
  value?: string;
  counter?: string | number;
  styles?: PersonInfoStyles;
}

export const PersonInfoAvatar: React.FC<PersonInfoAvatarProps> = ({
  avatar,
  value,
  counter,
  styles,
}) => {
  return (
    <S.AvatarWrapper>
      <Avatar size={24} image={avatar} />
      {value && (
        <PersonInfoValue
          value={value}
          counter={counter}
          css={styles?.avatarName}
          counterCss={styles?.counter}
        />
      )}
    </S.AvatarWrapper>
  );
};
