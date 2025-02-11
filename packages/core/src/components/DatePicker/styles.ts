import Wrapper from '@components/Wrapper';
import styled from '@emotion/styled';

export const DaysViewCell = styled(Wrapper)<{
  isCalendarMonth: boolean;
  isCalendarDateNow: boolean;
  isCalendarDateSelected: boolean;
}>`
  width: 40px;
  height: 40px;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: ${({ theme, isCalendarDateNow }) =>
    isCalendarDateNow ? `1px solid ${theme.colors.greyFocused}` : 'none'};
  color: ${({ theme, isCalendarMonth, isCalendarDateSelected }) =>
    isCalendarDateSelected
      ? theme.colors.white
      : isCalendarMonth
      ? theme.colors.greyDarker
      : theme.colors.grey};
  background: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected
      ? `linear-gradient(247deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
      : 'none'};
  cursor: ${({ isCalendarMonth }) => (isCalendarMonth ? 'pointer' : 'default')};
  pointer-events: ${({ isCalendarMonth }) => !isCalendarMonth && 'none'};
  user-select: none;
  &:hover {
    background: ${({ theme, isCalendarMonth }) =>
      isCalendarMonth && theme.colors.greyLighter};
    color: ${({ theme, isCalendarMonth }) =>
      isCalendarMonth && theme.colors.greyDarker};
    border: ${({ theme, isCalendarDateNow }) =>
      isCalendarDateNow && `1px solid ${theme.colors.greyFocused}`};
  }
`;
