import React from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import type { IconProps } from '@components/Icon/types';
import Avatar from '@components/Avatar';
import { PersonInfoProps } from './types';
import * as S from './styles';

const DEFAULT_BADGE_COLORS: Array<keyof MainColors> = [
  'purple',
  'blueLight',
  'green',
  'blue',
  'pink',
  'turquoise',
  'yellow',
  'yellowWarm',
];

export const PersonInfo = React.forwardRef<HTMLDivElement, PersonInfoProps>(
  function PersonInfo(
    {
      title,
      icon,
      value,
      badges,
      avatar,
      counter,
      attributes,
      description,
      styles,
      className,
      ...props
    },
    ref,
  ) {
    const theme = useTheme();

    const renderBadges = () => {
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

    return (
      <S.PersonInfoBase ref={ref} className={className} {...props}>
        <S.PersonInfoHeader>
          {icon && (
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
          )}
          <S.TitleWrapper>
            <S.Title css={styles?.title}>{title}</S.Title>
            {avatar && (
              <S.AvatarWrapper>
                <Avatar size={24} image={avatar} />
                {value && (
                  <S.TextBase css={styles?.avatarName}>
                    {value}
                    {counter !== undefined && (
                      <S.Counter css={styles?.counter}> {counter}</S.Counter>
                    )}
                  </S.TextBase>
                )}
              </S.AvatarWrapper>
            )}
            {!avatar && value && (
              <S.TextBase css={styles?.value}>
                {value}
                {counter !== undefined && (
                  <S.Counter css={styles?.counter}> {counter}</S.Counter>
                )}
              </S.TextBase>
            )}
            {badges && renderBadges()}
            {attributes && attributes.length > 0 && (
              <S.AttributesList>
                {attributes.map((attr, index) => {
                  if (typeof attr === 'string') {
                    return (
                      <S.TextBase key={index} css={styles?.attributes}>
                        {attr}
                      </S.TextBase>
                    );
                  }
                  return <React.Fragment key={index}>{attr}</React.Fragment>;
                })}
              </S.AttributesList>
            )}
            {description && (
              <S.TextBase css={styles?.description}>{description}</S.TextBase>
            )}
          </S.TitleWrapper>
        </S.PersonInfoHeader>
      </S.PersonInfoBase>
    );
  },
);
