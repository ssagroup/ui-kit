import React from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import type { IconProps } from '@components/Icon/types';
import * as S from './styles';

interface PersonInfoIconProps {
  icon: IconProps['name'] | React.ReactNode;
}

export const PersonInfoIcon: React.FC<PersonInfoIconProps> = ({ icon }) => {
  const theme = useTheme();

  return (
    <S.IconWrapper>
      {typeof icon === 'string' ? (
        <Icon
          name={icon as IconProps['name']}
          size={16}
          color={theme.colors.greyDarker}
        />
      ) : (
        icon
      )}
    </S.IconWrapper>
  );
};
