import { KeyboardEvent, MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

/** Props of {@link DropdownSearch}. */
export interface DropdownSearchProps {
  /** Typed text. */
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  /** Id of the list the input drives. */
  listId: string;
  /** Opens upward or downward from the toggle. */
  placement?: 'top' | 'bottom';
  zIndex?: number;
  /** The highlighted option's id. */
  'aria-activedescendant'?: string;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
  /** The options list. */
  children: ReactNode;
}

/*
 * Matches the Calendar time zone picker: a white card holding the search box
 * above the list. Positioned against the dropdown base, like the plain list.
 */
const panel = (theme: Theme, placement: 'top' | 'bottom', zIndex: number) =>
  css({
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 8,
    borderRadius: 12,
    background: theme.colors.white,
    boxShadow: `0 10px 40px 0 ${theme.colors.greyShadow}`,
    ...(placement === 'top'
      ? { bottom: '100%', margin: '0 0 4px' }
      : { top: '100%', margin: '4px 0 0' }),
  });

const input = (theme: Theme) =>
  css({
    boxSizing: 'border-box',
    width: '100%',
    height: 36,
    padding: '0 12px',
    font: 'inherit',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '18px',
    border: `1px solid ${theme.colors.greyFocused}`,
    borderRadius: 8,
    color: theme.colors.greyDarker,
    background: theme.colors.white,
    outline: 'none',
    '&:focus': { borderColor: theme.palette.primary.main },
  });

// Clicks on the card's padding keep focus in the search box.
const keepInputFocus = (event: MouseEvent) => {
  if (!(event.target instanceof HTMLInputElement)) event.preventDefault();
};

/**
 * The open list of a searchable `Dropdown` / `MultipleDropdown`: a search box,
 * focused on open, above the options. The box is the combobox while the list
 * is open — it keeps focus and points at the highlighted option.
 */
export const DropdownSearch = ({
  query,
  onQueryChange,
  placeholder,
  listId,
  placement = 'bottom',
  zIndex = 2,
  children,
  ...inputProps
}: DropdownSearchProps) => {
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    // Pointer-only focus guard; the keyboard lives on the input.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div css={panel(theme, placement, zIndex)} onMouseDown={keepInputFocus}>
      <input
        {...inputProps}
        ref={ref}
        type="text"
        role="combobox"
        aria-label={placeholder}
        aria-expanded
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        css={input(theme)}
        placeholder={placeholder}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {children}
    </div>
  );
};
