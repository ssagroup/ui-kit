import React from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import type { IconProps } from '@components/Icon/types';
import Avatar from '@components/Avatar';
import { PersonInfoProps } from './types';
import {
  PersonInfoBase,
  PersonInfoHeader,
  IconWrapper,
  TitleWrapper,
  Title,
  Value,
  Counter,
  AttributesList,
  AttributeItem,
  Description,
  AvatarWrapper,
  AvatarName,
  BadgeWrapper,
  StyledBadge,
} from './styles';

const DEFAULT_BADGE_COLORS: Array<keyof MainColors> = [
  'purple',
  'blueLight',
  'green',
  'pink',
  'turquoise',
];

export const PersonInfo = React.forwardRef<HTMLDivElement, PersonInfoProps>(
  function PersonInfo(
    {
      title,
      icon,
      value,
      badge,
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
      if (!badge) return null;

      if (!Array.isArray(badge)) {
        return <BadgeWrapper css={styles?.badge}>{badge}</BadgeWrapper>;
      }

      return (
        <BadgeWrapper css={styles?.badge}>
          {badge.map((badgeItem, index) => {
            if (typeof badgeItem === 'string') {
              const colorIndex = index % DEFAULT_BADGE_COLORS.length;
              return (
                <StyledBadge
                  key={index}
                  color={DEFAULT_BADGE_COLORS[colorIndex]}
                  size="medium"
                  css={styles?.badgeItem}>
                  {badgeItem}
                </StyledBadge>
              );
            }

            return <React.Fragment key={index}>{badgeItem}</React.Fragment>;
          })}
        </BadgeWrapper>
      );
    };

    return (
      <PersonInfoBase ref={ref} className={className} {...props}>
        <PersonInfoHeader>
          {icon && (
            <IconWrapper>
              {typeof icon === 'string' ? (
                <Icon
                  name={icon as IconProps['name']}
                  size={16}
                  color={theme.colors.greyDarker}
                />
              ) : (
                icon
              )}
            </IconWrapper>
          )}
          <TitleWrapper>
            <Title css={styles?.title}>{title}</Title>
            {(value || avatar) && (
              <>
                {avatar && (
                  <AvatarWrapper>
                    <Avatar size={24} image={avatar} />
                    {value && (
                      <AvatarName css={styles?.avatarName}>
                        {value}
                        {counter !== undefined && (
                          <Counter css={styles?.counter}> {counter}</Counter>
                        )}
                      </AvatarName>
                    )}
                  </AvatarWrapper>
                )}
                {!avatar && value && (
                  <Value css={styles?.value}>
                    {value}
                    {counter !== undefined && (
                      <Counter css={styles?.counter}> {counter}</Counter>
                    )}
                  </Value>
                )}
              </>
            )}
            {badge && renderBadges()}
            {attributes && attributes.length > 0 && (
              <AttributesList>
                {attributes.map((attr, index) => {
                  if (typeof attr === 'string') {
                    return (
                      <AttributeItem key={index} css={styles?.attributes}>
                        {attr}
                      </AttributeItem>
                    );
                  }
                  return <React.Fragment key={index}>{attr}</React.Fragment>;
                })}
              </AttributesList>
            )}
            {description && (
              <Description css={styles?.description}>{description}</Description>
            )}
          </TitleWrapper>
        </PersonInfoHeader>
      </PersonInfoBase>
    );
  },
);
