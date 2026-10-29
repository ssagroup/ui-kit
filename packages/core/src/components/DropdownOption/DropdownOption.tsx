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
  /** Whether this option is disabled. Disabled options can't be picked and keyboard navigation skips them. */
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
 * ### Options are descriptions, not rendered elements
 * The enclosing dropdown reads each option's props and renders the row
 * itself (through the shared `ContextMenu` list), so the option element is
 * never mounted. The visible label resolves as **`children` → `label` →
 * `value`**: `<DropdownOption value="Sales" />` displays "Sales",
 * `label` overrides that for a different display string, and `children` wins
 * over both when a row needs custom markup. Keep `label` set to plain text
 * when `children` is markup — it is what the toggle shows once selected.
 *
 * The row wraps the label for truncation and attaches a tooltip. Only
 * `value`, `label`, `children`, `avatar`, `disabled`, a literal `className`
 * and `data-testid` are read — styles from `styled(DropdownOption)` or a `css`
 * prop on the option are not applied.
 *
 * ### Selection state comes from the parent
 * You supply `value` and let `Dropdown` / `MultipleDropdown` report selection
 * through its own `onChange`.
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
