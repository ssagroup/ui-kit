import { Theme, css } from '@emotion/react';

/**
 * Figma: PeopleOps → Competency Wizard (node 11999:36608 / 11999:36625).
 *
 * The group is one flat 40px-tall strip: 8px radius on the outer corners only,
 * 1px seams between buttons, and two greys — `secondary.light` at rest,
 * `secondary.main` for the selected button. Hover/focus go one step darker
 * (`secondary.dark`) in both states; the design has no hover spec, so this
 * keeps the variant's own behaviour rather than inventing a colour.
 *
 * Selection is marked by colour alone. The Figma layers also carry a larger,
 * heavier face on the selected label (14px/600 against 13.33px/500), but
 * applying it resizes the button as the selection moves, so the strip visibly
 * jumps — and at this size the states read as a colour difference anyway.
 */
export const ButtonItem = (theme: Theme) => css`
  /* inline-flex, not flex: the group renders its buttons straight into the
     consumer's container with no wrapper, so a block-level button would break
     the strip onto separate lines. */
  display: inline-flex;

  /* Inline boxes align on their text baseline, and the selected button sets a
     larger face than the rest — without this the strip sits unevenly. */
  vertical-align: middle;
  align-items: center;
  justify-content: center;

  /* Floors an icon-only button at a 40x40 square whatever icon it is handed,
     and keeps a one-character label from collapsing. */
  min-width: 40px;
  height: 40px;
  padding: 8px 16px;
  text-align: center;
  letter-spacing: 0;
  border-radius: 0;
  box-shadow: none;
  user-select: none;
  background: ${theme.palette.secondary.light};

  &:hover,
  &:focus,
  &:active {
    background: ${theme.palette.secondary.dark};
    box-shadow: none;
  }

  &:first-of-type {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
  }

  &:not(:last-child) {
    margin-right: 1px;
  }

  p {
    font-size: 13.33px;
    font-weight: 500;
    line-height: 15px;
    color: ${theme.colors.greyDarker80};
  }

  &.active {
    background: ${theme.palette.secondary.main};

    /* Colour only — see the note above on why the face does not change. */
    p {
      color: ${theme.colors.greyDarker};
    }
  }

  &.active:hover,
  &.active:focus {
    background: ${theme.palette.secondary.dark};
  }

  &:disabled {
    background: ${theme.colors.grey};

    p {
      color: ${theme.colors.grey40};
    }

    /* Icons carry their colour on a fill prop, and 34 of the 227 in the kit
       paint with stroke instead — so there is no one property to recolour
       here. Opacity mutes both kinds. */
    svg {
      opacity: 0.4;
    }
  }
`;

/**
 * Icon-only: the label padding collapses to the symmetric 8px of the design,
 * leaving `min-width` above to square the box off.
 */
export const IconOnlyItem = css`
  padding: 8px;
`;

export const IconSlot = css`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;

/** 6px, matching `Button`'s own icon slots. */
export const IconSlotWithLabel = css`
  margin-right: 6px;
`;
