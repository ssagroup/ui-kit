import Wrapper from '@components/Wrapper';
import styled from '@emotion/styled';

/*
 * Calendar cell styles shared by **DatePicker** and **DateRangePicker**.
 *
 * `DateRangePicker/styles.ts` re-exports the three cell components from here
 * rather than redeclaring them, so a token or geometry fix only has to be made
 * once. Both pickers drive the "selected" look through the same
 * `isCalendarDateSelected` prop — the single-date pickers pass their
 * `isCalendarYear` / `isCalendarMonth` flag into it.
 */

/**
 * Which edge of a highlighted range a cell sits on. Drives the cell's corner
 * rounding so start/end cells form a single connected pill with the range
 * cells between them, matching the Figma `Range Selected Start/End` variants.
 *
 * - **`start`** — rounded on the left only
 * - **`end`** — rounded on the right only
 * - **`both`** — a standalone selection (or a one-cell range), fully rounded
 */
export type RangeEdge = 'start' | 'end' | 'both';

export const getCellRadius = (
  rangeEdge: RangeEdge | undefined,
  isHighlighted: boolean,
) => {
  if (rangeEdge === 'start') return '6px 0 0 6px';
  if (rangeEdge === 'end') return '0 6px 6px 0';
  if (rangeEdge === 'both') return '6px';
  return isHighlighted ? '0' : '6px';
};

/**
 * Works out which edge of a highlighted range a selected cell sits on.
 *
 * A range only has distinct edges when both anchors exist, so without an
 * active range (or when both anchors land on the same cell) the cell is
 * fully rounded. `mode` says which anchor *this* picker holds, which is what
 * decides whether its own value rounds on the left or the right.
 */
export const getRangeEdge = ({
  isFirstSelected,
  isSecondSelected,
  isRangeActive,
  mode,
}: {
  isFirstSelected: boolean;
  isSecondSelected: boolean;
  isRangeActive: boolean;
  mode?: 'dateFrom' | 'dateTo';
}): RangeEdge | undefined => {
  if (!isFirstSelected && !isSecondSelected) return undefined;
  if (!isRangeActive || (isFirstSelected && isSecondSelected)) return 'both';
  const isStart = mode === 'dateFrom' ? isFirstSelected : isSecondSelected;
  return isStart ? 'start' : 'end';
};

/**
 * Time panel shown beside the calendar. Figma lays the hours and minutes out
 * as rows of two 56×40 cells with an 8px gap; two scrolling columns in one
 * scroll container produce the same result while keeping the lists independent.
 */
export const TimePanel = styled.div`
  display: flex;
  gap: 8px;
  align-self: stretch;
  padding: 24px 24px 0 0;
  height: 100%;
  overflow: hidden;
`;

/**
 * Each column scrolls on its own so the hours list can be moved without
 * dragging the minutes along with it.
 */
export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TimeCell = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
  user-select: none;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.white : theme.colors.greyDarker};
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.primary.main : 'none'};
  &:hover {
    background: ${({ theme, isSelected }) =>
      isSelected ? theme.palette.primary.main : theme.palette.secondary.light};
  }
`;

export const DaysViewCell = styled(Wrapper)<{
  isCalendarDateNow: boolean;
  isCalendarDateSelected: boolean;
  isHighlighted: boolean;
  rangeEdge?: RangeEdge;
}>`
  position: relative;
  width: 40px;
  height: 40px;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  border-radius: ${({ rangeEdge, isHighlighted }) =>
    getCellRadius(rangeEdge, isHighlighted)};
  border: ${({ theme, isCalendarDateNow }) =>
    isCalendarDateNow ? `1px solid ${theme.colors.grey}` : 'none'};
  color: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected ? theme.colors.white : theme.colors.greyDarker};
  background: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected && theme.palette.primary.main};
  cursor: pointer;
  user-select: none;
  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.grey};
    cursor: default;
    pointer-events: none;
  }
  &[aria-disabled='false'] {
    background: ${({ theme, isCalendarDateSelected, isHighlighted }) =>
      isHighlighted && !isCalendarDateSelected && theme.colors.blueLighter20};
    &:hover {
      background: ${({ theme }) => theme.palette.secondary.light};
      color: ${({ theme }) => theme.colors.greyDarker};
    }
  }
  &:hover {
    border: ${({ theme, isCalendarDateNow }) =>
      isCalendarDateNow && `1px solid ${theme.colors.grey}`};
  }
`;

export const YearsViewCell = styled.div<{
  isCalendarDateSelected: boolean;
  isHighlighted: boolean;
  rangeEdge?: RangeEdge;
}>`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 70px;
  height: 40px;
  border-radius: ${({ rangeEdge, isHighlighted }) =>
    getCellRadius(rangeEdge, isHighlighted)};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  user-select: none;
  cursor: pointer;
  color: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected ? theme.colors.white : theme.colors.greyDarker};
  background: ${({ theme, isCalendarDateSelected, isHighlighted }) => {
    if (isCalendarDateSelected) return theme.palette.primary.main;
    return isHighlighted ? theme.colors.blueLighter20 : 'none';
  }};
  &:hover {
    background: ${({ theme }) => theme.palette.secondary.light};
    color: ${({ theme }) => theme.colors.greyDarker};
    /* Figma's Year Cell "Hover Cell" variant is rounded, even mid-range. */
    border-radius: 6px;
  }
`;

export const MonthsViewCell = styled.div<{
  isCalendarDateSelected: boolean;
  isHighlighted: boolean;
  rangeEdge?: RangeEdge;
}>`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: 93.33px;
  height: 40px;
  border-radius: ${({ rangeEdge, isHighlighted }) =>
    getCellRadius(rangeEdge, isHighlighted)};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
  color: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected ? theme.colors.white : theme.colors.greyDarker};
  user-select: none;
  background: ${({ theme, isCalendarDateSelected }) =>
    isCalendarDateSelected ? theme.palette.primary.main : 'none'};
  &[aria-disabled='true'] {
    cursor: default;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.greyDarker};
    background: ${({ theme }) => theme.colors.grey};
  }
  &[aria-disabled='false'] {
    background: ${({ theme, isHighlighted, isCalendarDateSelected }) =>
      isHighlighted && !isCalendarDateSelected && theme.colors.blueLighter20};
    &:hover {
      background: ${({ theme }) => theme.palette.secondary.light};
      color: ${({ theme }) => theme.colors.greyDarker};
    }
  }
`;
