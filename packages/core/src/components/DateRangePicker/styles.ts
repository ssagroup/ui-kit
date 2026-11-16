import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';

/*
 * The calendar cells are identical to the single-date picker's, so they live in
 * `DatePicker/styles.ts` and are re-exported here. Keeping one definition means
 * a token, geometry, or range-edge fix lands in both pickers at once — the two
 * files having drifted apart is exactly what this avoids.
 */
export {
  DaysViewCell,
  YearsViewCell,
  MonthsViewCell,
  getCellRadius,
  getRangeEdge,
  type RangeEdge,
} from '@components/DatePicker/styles';

export const TriggerWrapper = styled(Wrapper)`
  padding: 14px;
  cursor: default;
`;

/**
 * Preset column shown to the left of the calendar. It mirrors the geometry of
 * the day-and-time pop-up's side panel — a fixed-width column with its own
 * padding — so the popover keeps one consistent layout whichever panel is on.
 */
export const PresetsPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  padding: 24px;
  overflow-y: auto;
  scrollbar-width: thin;
  border-right: 1px solid ${({ theme }) => theme.colors.greyLighter};
`;

/**
 * A single preset. The active look reuses the selected-cell tokens from the
 * calendar so a highlighted preset and a highlighted day read as the same
 * state.
 */
export const PresetButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  /* Figma "Filter Cell": a 40px row, the same height as a calendar day cell. */
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: left;
  cursor: pointer;
  user-select: none;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.greyDarker};
  background: ${({ theme, isActive }) =>
    isActive ? theme.palette.primary.main : 'transparent'};
  &:hover {
    background: ${({ theme, isActive }) =>
      isActive ? theme.palette.primary.main : theme.palette.secondary.light};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
    outline-offset: 1px;
  }
`;
