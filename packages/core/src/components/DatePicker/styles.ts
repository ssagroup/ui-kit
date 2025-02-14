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

// export const DaysViewCell = styled(Wrapper)<{
//   isCalendarDateNow: boolean;
//   isCalendarDateSelected: boolean;
//   isAriaDisabled: boolean;
// }>`
//   width: 40px;
//   height: 40px;
//   justify-content: center;
//   font-size: 14px;
//   font-weight: 500;
//   border-radius: 6px;
//   border: ${({ theme, isCalendarDateNow }) =>
//     isCalendarDateNow ? `1px solid ${theme.colors.greyFocused}` : 'none'};
//   color: ${({ theme, isAriaDisabled, isCalendarDateSelected }) =>
//     isCalendarDateSelected
//       ? theme.colors.white
//       : isAriaDisabled
//       ? theme.colors.grey
//       : theme.colors.greyDarker};
//   background: ${({ theme, isCalendarDateSelected }) =>
//     isCalendarDateSelected
//       ? `linear-gradient(247deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
//       : 'none'};
//   cursor: ${({ isAriaDisabled }) => (isAriaDisabled ? 'default' : 'pointer')};
//   pointer-events: ${({ isAriaDisabled }) => isAriaDisabled && 'none'};
//   user-select: none;
//   &:hover {
//     background: ${({ theme, isAriaDisabled }) =>
//       !isAriaDisabled && theme.colors.greyLighter};
//     color: ${({ theme, isAriaDisabled }) =>
//       !isAriaDisabled && theme.colors.greyDarker};
//     border: ${({ theme, isCalendarDateNow }) =>
//       isCalendarDateNow && `1px solid ${theme.colors.greyFocused}`};
//   }
// `;

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
  background: ${({ theme, isCalendarMonth }) =>
    isCalendarMonth
      ? `linear-gradient(247.37deg, ${theme.colors.blueLighter} 14.71%, ${theme.colors.blue} 85.29%)`
      : 'none'};
  &:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
    color: ${({ theme }) => theme.colors.greyDarker};
  }
`;
