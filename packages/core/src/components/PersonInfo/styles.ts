import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';
import Badge from '@components/Badge';

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

export const Value = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`;

export const ValueWithCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Counter = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.greyDropdownFocused};
  margin-left: 5px;
`;

export const AttributesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AttributeItem = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`;

export const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AvatarName = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
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
