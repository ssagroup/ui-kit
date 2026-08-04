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
