import React from 'react';
import * as S from './styles';
import { PersonInfoStyles } from './types';
import { DEFAULT_BADGE_COLORS } from './constants';

interface PersonInfoBadgesProps {
  badges: React.ReactNode | (string | React.ReactNode)[];
  styles?: PersonInfoStyles;
}

export const PersonInfoBadges: React.FC<PersonInfoBadgesProps> = ({
  badges,
  styles,
}) => {
  if (!badges) return null;

  if (!Array.isArray(badges)) {
    return <S.BadgeWrapper css={styles?.badge}>{badges}</S.BadgeWrapper>;
  }

  return (
    <S.BadgeWrapper css={styles?.badge}>
      {badges.map((badgeItem, index) => {
        if (typeof badgeItem === 'string') {
          const colorIndex = index % DEFAULT_BADGE_COLORS.length;
          const colorName = DEFAULT_BADGE_COLORS[colorIndex];
          return (
            <S.CustomBadge
              key={index}
              colorName={colorName}
              css={styles?.badgeItem}>
              {badgeItem}
            </S.CustomBadge>
          );
        }

        return <React.Fragment key={index}>{badgeItem}</React.Fragment>;
      })}
    </S.BadgeWrapper>
  );
};
