import styled from '@emotion/styled';
import Wrapper from '@components/Wrapper';

export const DatesListWrapper = styled(Wrapper)`
  flex-wrap: wrap;
  & > div.hover-range-from.date-hovered,
  & > div.hover-range-to.date-hovered {
    background: ${({ theme }) => theme.colors.greenLighter};
    border-left: none;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  & > div.hover-range-from:not(.selected-range-from, .date-hovered),
  & > div.hover-range-to:not(.selected-range-to, .date-hovered) {
    background: ${({ theme }) => theme.colors.greenLighter60};
    border-radius: 0;
  }
  & > div.hover-range-from.selected-range-from::after,
  & > div.hover-range-from.date-hovered::after,
  & > div.hover-range-to.selected-range-to::after,
  & > div.hover-range-to.date-hovered::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 40px;
    z-index: -1;
    background: ${({ theme }) => theme.colors.greenLighter60};
  }
  & > div.hover-range-from.selected-range-from::after,
  & > div.hover-range-to.date-hovered::after {
    left: 0;
  }
  & > div.hover-range-from.date-hovered::after,
  & > div.hover-range-to.selected-range-to::after {
    right: 0;
  }
  & > div.hover-range-form.selected-range-from:has(~ div.date-hovered)::after,
  & > div.hover-range-to.selected-range-to:has(+ div.date-hovered)::after,
  & > div.date-hovered:has(+ div.selected-range-from)::after,
  & > div.hover-range-to.selected-range-to + div.date-hovered::after,
  & > div.date-hovered + div.selected-range-from::after {
    background: ${({ theme }) => theme.colors.greenLighter};
  }
`;
