import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';

/**
 * Wraps the date grid and styles the "range you are about to pick" preview
 * band that appears between a selected anchor and the currently hovered cell.
 *
 * The band is a translucent fill with a hairline top/bottom rule, capped with
 * a rounded corner at each end — so which cell is the left cap and which is
 * the right depends on the direction being previewed:
 *
 * - **`hover-range-from`** — hovering *before* the start anchor, so the
 *   hovered cell is the left cap and the selected anchor is the right.
 * - **`hover-range-to`** — hovering *after* the end anchor, so the selected
 *   anchor is the left cap and the hovered cell is the right.
 */
export const DatesListWrapper = styled(Wrapper)`
  flex-wrap: wrap;

  & > div.hover-range-from:not(.selected-range-from),
  & > div.hover-range-to:not(.selected-range-to) {
    background: ${({ theme }) => theme.colors.greyPale16};
    border-top: 1px solid ${({ theme }) => theme.palette.secondary.light};
    border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.light};
    border-radius: 0;
  }

  & > div.hover-range-from.date-hovered,
  & > div.hover-range-to.selected-range-to {
    border-left: 1px solid ${({ theme }) => theme.palette.secondary.light};
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  & > div.hover-range-from.selected-range-from,
  & > div.hover-range-to.date-hovered {
    border-right: 1px solid ${({ theme }) => theme.palette.secondary.light};
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
