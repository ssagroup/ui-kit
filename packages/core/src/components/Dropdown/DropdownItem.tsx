import styled from '@emotion/styled';
import { IDropdownItemProps } from './types';

export const DropdownItemBase = styled.li<Pick<IDropdownItemProps, 'isActive'>>`
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    display: block;
  }

  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.greySelectedMenuItem : 'inherit'};
  overflow: hidden;
  border: none;
`;

export const DropdownItem = ({
  onClick,
  isActive,
  children,
  noHover,
}: IDropdownItemProps) => {
  return (
    <DropdownItemBase
      isActive={isActive}
      aria-selected={isActive}
      css={(theme) =>
        !noHover && {
          '&:hover': {
            background: theme.colors.greyLighter,
          },
        }
      }>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </DropdownItemBase>
  );
};
