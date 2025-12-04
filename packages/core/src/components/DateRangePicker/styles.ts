import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';

export const DaysViewCell = styled(Wrapper)<{
  isCalendarDateNow: boolean;
  isCalendarDateSelected: boolean;
  isCalendarFirstDateSelected?: boolean;
  isCalendarSecondDateSelected?: boolean;
  isHighlighted: boolean;
}>`
  position: relative;
  width: 40px;
  height: 40px;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: ${({ isHighlighted }) => (isHighlighted ? 0 : '6px')};
  border: ${({ theme, isCalendarDateNow }) =>
    isCalendarDateNow ? `1px solid ${theme.colors.greyFocused}` : 'none'};
  color: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected ? theme.colors.white : theme.colors.greyDarker};
  background: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected &&
    `linear-gradient(247deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`};
  cursor: pointer;
  user-select: none;
  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.grey};
    cursor: default;
    pointer-events: none;
  }
  &[aria-disabled='false'] {
    background: ${({ theme, isCalendarDateSelected, isHighlighted }) =>
      isHighlighted && !isCalendarDateSelected && theme.colors.blueRoyal16};
    &:hover {
      background: ${({ theme }) => theme.colors.greyLighter};
      color: ${({ theme }) => theme.colors.greyDarker};
    }
    &::before {
      content: '';
      display: ${({
        isCalendarFirstDateSelected,
        isCalendarSecondDateSelected,
      }) =>
        isCalendarFirstDateSelected || isCalendarSecondDateSelected
          ? 'block'
          : 'none'};
      position: absolute;
      width: 10px;
      height: 40px;
      left: ${({ isCalendarSecondDateSelected }) =>
        isCalendarSecondDateSelected ? '0' : 'auto'};
      right: ${({ isCalendarFirstDateSelected }) =>
        isCalendarFirstDateSelected ? '0' : 'auto'};
      z-index: -1;
      background: ${({ theme }) => theme.colors.blueRoyal16};
    }
  }
  &:hover {
    border: ${({ theme, isCalendarDateNow }) =>
      isCalendarDateNow && `1px solid ${theme.colors.greyFocused}`};
  }
`;

export const YearsViewCell = styled.div<{
  isCalendarYear: boolean;
  isCalendarFirstDateSelected?: boolean;
  isCalendarSecondDateSelected?: boolean;
  isHighlighted: boolean;
}>`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 70px;
  height: 40px;
  border-radius: ${({
    isCalendarFirstDateSelected,
    isCalendarSecondDateSelected,
  }) =>
    isCalendarFirstDateSelected || isCalendarSecondDateSelected ? '6px' : 0};
  font-size: 14px;
  font-weight: 500px;
  user-select: none;
  cursor: pointer;
  color: ${({
    theme,
    isCalendarYear,
    isCalendarFirstDateSelected,
    isCalendarSecondDateSelected,
  }) =>
    (isCalendarYear ||
      isCalendarFirstDateSelected ||
      isCalendarSecondDateSelected) &&
    theme.colors.white};
  background: ${({
    theme,
    isCalendarYear,
    isCalendarFirstDateSelected,
    isCalendarSecondDateSelected,
  }) =>
    isCalendarYear ||
    isCalendarFirstDateSelected ||
    isCalendarSecondDateSelected
      ? `linear-gradient(247.37deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
      : 'none'};
  background: ${({
    theme,
    isHighlighted,
    isCalendarYear,
    isCalendarSecondDateSelected,
  }) =>
    isHighlighted &&
    !isCalendarYear &&
    !isCalendarSecondDateSelected &&
    theme.colors.blueRoyal16};
  &:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
    color: ${({ theme }) => theme.colors.greyDarker};
    border-radius: 6px;
  }
  &::before {
    content: '';
    display: ${({
      isCalendarFirstDateSelected,
      isCalendarSecondDateSelected,
    }) =>
      isCalendarFirstDateSelected || isCalendarSecondDateSelected
        ? 'block'
        : 'none'};
    position: absolute;
    width: 10px;
    height: 40px;
    left: ${({ isCalendarSecondDateSelected }) =>
      isCalendarSecondDateSelected ? '0' : 'auto'};
    right: ${({ isCalendarFirstDateSelected }) =>
      isCalendarFirstDateSelected ? '0' : 'auto'};
    z-index: -1;
    background: ${({ theme }) => theme.colors.blueRoyal16};
  }
`;

export const MonthsViewCell = styled.div<{
  isCalendarFirstDateSelected?: boolean;
  isCalendarSecondDateSelected?: boolean;
  isHighlighted: boolean;
}>`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 99px;
  height: 40px;
  border-radius: ${({
    isCalendarFirstDateSelected,
    isCalendarSecondDateSelected,
  }) =>
    isCalendarFirstDateSelected || isCalendarSecondDateSelected ? '6px' : 0};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${({
    theme,
    isCalendarFirstDateSelected,
    isCalendarSecondDateSelected,
  }) =>
    (isCalendarFirstDateSelected || isCalendarSecondDateSelected) &&
    theme.colors.white};
  user-select: none;
  background: ${({
    theme,
    isCalendarFirstDateSelected,
    isCalendarSecondDateSelected,
  }) =>
    isCalendarFirstDateSelected || isCalendarSecondDateSelected
      ? `linear-gradient(247.37deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
      : 'none'};
  &[aria-disabled='true'] {
    cursor: default;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.greyDarker};
    background: ${({ theme }) => theme.colors.grey};
  }
  &[aria-disabled='false'] {
    background: ${({ theme, isHighlighted, isCalendarSecondDateSelected }) =>
      isHighlighted &&
      !isCalendarSecondDateSelected &&
      theme.colors.blueRoyal16};
    &:hover {
      background: ${({ theme }) => theme.colors.greyLighter};
      color: ${({ theme }) => theme.colors.greyDarker};
    }
    &::before {
      content: '';
      display: ${({
        isCalendarFirstDateSelected,
        isCalendarSecondDateSelected,
      }) =>
        isCalendarFirstDateSelected || isCalendarSecondDateSelected
          ? 'block'
          : 'none'};
      position: absolute;
      width: 10px;
      height: 40px;
      left: ${({ isCalendarSecondDateSelected }) =>
        isCalendarSecondDateSelected ? '0' : 'auto'};
      right: ${({ isCalendarFirstDateSelected }) =>
        isCalendarFirstDateSelected ? '0' : 'auto'};
      z-index: -1;
      background: ${({ theme }) => theme.colors.blueRoyal16};
    }
  }
`;

export const TriggerWrapper = styled(Wrapper)`
  padding: 14px;
  cursor: default;
`;
