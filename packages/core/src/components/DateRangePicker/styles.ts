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
