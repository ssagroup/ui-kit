import Wrapper from '@components/Wrapper';
import styled from '@emotion/styled';

export const DaysViewCell = styled(Wrapper)<{
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
  color: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected ? theme.colors.white : theme.colors.greyDarker};
  background: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected
      ? `linear-gradient(247deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
      : 'none'};
  cursor: pointer;
  user-select: none;
  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.grey};
    cursor: default;
    pointer-events: none;
  }
  &[aria-disabled='false']:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
    color: ${({ theme }) => theme.colors.greyDarker};
  }
  &:hover {
    border: ${({ theme, isCalendarDateNow }) =>
      isCalendarDateNow && `1px solid ${theme.colors.greyFocused}`};
  }
`;

export const YearsViewCell = styled.div<{
  isCalendarYear: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500px;
  user-select: none;
  cursor: pointer;
  color: ${({ theme, isCalendarYear }) => isCalendarYear && theme.colors.white};
  background: ${({ theme, isCalendarYear }) =>
    isCalendarYear
      ? `linear-gradient(247.37deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
      : 'none'};
  &:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
    color: ${({ theme }) => theme.colors.greyDarker};
  }
`;

export const MonthsViewCell = styled.div<{
  isCalendarMonth: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99px;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500px;
  cursor: pointer;
  color: ${({ theme, isCalendarMonth }) =>
    isCalendarMonth && theme.colors.white};
  user-select: none;
  background: ${({ theme, isCalendarMonth }) =>
    isCalendarMonth
      ? `linear-gradient(247.37deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
      : 'none'};
  &[aria-disabled='true'] {
    cursor: default;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.greyDarker};
    background: ${({ theme }) => theme.colors.grey};
  }
  &[aria-disabled='false']:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
    color: ${({ theme }) => theme.colors.greyDarker};
  }
`;
