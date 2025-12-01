import styled from '@emotion/styled';
import { Interpolation, Theme } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import Badge from '@components/Badge';
import { BADGE_COLORS } from './constants';

export const PersonInfoBase = styled.div<CommonProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PersonInfoHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TextBase = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`;

export const ValueWithCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Counter = styled(TextBase.withComponent('span'))`
  color: ${({ theme }) => theme.colors.greyDropdownFocused};
  margin-left: 5px;
  cursor: pointer;
`;

export const CounterTooltipContent = styled.div`
  min-width: 220px;
  padding: 12px;
`;

export const CounterTooltipList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: auto;
  max-height: 220px;
  overflow: hidden;
  overflow-y: auto;
  padding-right: 4px;
`;

export const AttributesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StyledBadge = styled(Badge)`
  padding: 4px 8px;
  border-radius: 20px;
`;

export const CustomBadge = styled.div<{ colorName: keyof MainColors }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 24px;
  font-weight: 500;
  font-size: 14px;

  color: ${({ theme, colorName }) => {
    const { text } = BADGE_COLORS(theme)[colorName];
    return text;
  }};

  background-color: ${({ theme, colorName }) => {
    const { bg } = BADGE_COLORS(theme)[colorName];
    return bg;
  }};
`;

export const personInfoValueLinkStyles: Interpolation<Theme> = (theme) => ({
  textDecoration: 'none',
  color: theme.colors.greyDarker,
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': {
    color: theme.colors.blue,
  },
});

export const avatarWrapperLinkStyles: Interpolation<Theme> = (theme) => ({
  textDecoration: 'none',
  color: theme.colors.greyDarker,
  cursor: 'pointer',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: theme.colors.blue,

    '& > div:last-child': {
      color: theme.colors.blue,
    },
  },
});
