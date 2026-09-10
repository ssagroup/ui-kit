import React, { forwardRef } from 'react';
import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';
import { resolveDisabled } from '@utils/deprecation';

export interface DropdownItemProps
  extends
    CommonProps,
    Omit<React.LiHTMLAttributes<HTMLLIElement>, 'value' | 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isActive?: boolean;
  isMultiple?: boolean;
  /** Whether this option is disabled. Only styled in `isMultiple` mode. */
  disabled?: boolean;
  /**
   * Whether this option is disabled.
   *
   * @deprecated Use `disabled` instead. Removed in the next major release.
   */
  isDisabled?: boolean;
  noHover?: boolean;
  value?: string | number | boolean;
  label?: string | number;
  children?: React.ReactNode;
  /** Avatar or icon to display before the option content (e.g. <Avatar size={20} image={url} />) */
  avatar?: React.ReactNode;
}

interface MultipleStylesProps {
  theme: Theme;
  isDisabled?: boolean;
}

const multipleStyles = ({ theme, isDisabled }: MultipleStylesProps) => {
  return css`
    background: none;
    color: ${isDisabled
      ? theme.colors.greyDisabledCheckbox
      : theme.colors.greyDisabled};
    &:hover {
      background: none;
    }
  `;
};

const DropdownOptionBase = styled.li<Omit<DropdownItemProps, 'disabled'>>`
  overflow: hidden;

  /* The row is a fixed 40px but its content (a ~19px line box) is shorter, so
     as a plain block the text sat flush against the top padding edge and all
     the leftover space fell below it. Centering it keeps the label aligned
     with the row's highlight band. */
  display: flex;
  align-items: center;

  height: 40px;
  padding: 8px 12px;

  border: none;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.greySelectedMenuItem : 'inherit'};

  &:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
  }

  ${({ isMultiple, isDisabled, theme }) =>
    isMultiple &&
    multipleStyles({
      theme,
      isDisabled,
    })}
`;

/**
 * DropdownOption - A single selectable row inside `Dropdown` or
 * `MultipleDropdown`.
 *
 * Thin wrapper over a styled `<li>`. It exists so that `disabled` can be
 * accepted as the supported prop name without emotion forwarding it to the
 * DOM, where `disabled` is not valid on an `<li>`.
 *
 * ### The parent supplies the visible label
 * Options are not rendered as written: the enclosing dropdown clones each one
 * and injects the label, resolved as **`children` → `label` → `value`**. So
 * `<DropdownOption value="Sales" />` displays "Sales" with no children needed,
 * `label` overrides that for a different display string, and `children` wins
 * over both when a row needs custom markup.
 *
 * The clone also wraps the label for truncation and attaches a tooltip, so put
 * custom content in `children` rather than styling the `<li>` directly.
 *
 * ### Selection state comes from the parent
 * `isActive`, `isMultiple` and the click wiring are set by `Dropdown` /
 * `MultipleDropdown`; you supply `value` and let the parent report selection
 * through its own `onChange`. Note `disabled` is only styled in `isMultiple`
 * mode.
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * // Label falls back to `value`
 * <Dropdown onChange={handleChange}>
 *   {teams.map((team) => (
 *     <DropdownOption key={team.id} value={team.name} />
 *   ))}
 * </Dropdown>
 * ```
 *
 * @example
 * ```tsx
 * // Report an id, display something else
 * <DropdownOption value={user.id} label={user.fullName} />
 * ```
 *
 * @example
 * ```tsx
 * // Custom row content; `avatar` fills the leading slot
 * <DropdownOption value={user.id} avatar={<Avatar size={20} image={user.photo} />}>
 *   {user.fullName} — {user.role}
 * </DropdownOption>
 * ```
 */
const DropdownOption = forwardRef<HTMLLIElement, DropdownItemProps>(
  function DropdownOption({ disabled, isDisabled, value, ...rest }, ref) {
    return (
      <DropdownOptionBase
        ref={ref}
        isDisabled={resolveDisabled('DropdownOption', disabled, isDisabled)}
        // `value` is widened to booleans here but narrow on <li>; forwarded
        // as-is to preserve the pre-existing runtime behaviour.
        value={
          value as React.ComponentProps<typeof DropdownOptionBase>['value']
        }
        {...rest}
      />
    );
  },
);

export default DropdownOption;
