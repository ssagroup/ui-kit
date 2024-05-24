import { css, useTheme } from '@emotion/react';
import { PopoverTrigger, Icon } from '@ssa-ui-kit/core';
import { Theme } from '@emotion/react';

export const filterButtonStyles = (count?: number) => (theme: Theme) => css`
  height: 40px;
  color: ${theme.colors.greyDisabled};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.greyDropdownMain};
  border-radius: 6.5px;
  padding: 0 11px 0 13px;
  font-size: 14px;
  letter-spacing: normal;
  gap: 5px;
  user-select: none;

  &::before {
    display: block;
    content: '"Filter"';
    content: ${count ? '"More"' : '"Filter"'};
  }

  @media screen and (min-width: 900px) {
    &::before {
      content: 'More';
    }
  }

  &:hover {
    border-color: ${theme.colors.greyDropdownFocused};
  }

  &:active {
    border-color: ${theme.colors.blueNotification};
  }

  &:disabled {
    background: ${theme.colors.grey};
  }
`;

export const TableFilterTrigger = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  count,
  ...rest
}: {
  children?: React.ReactNode;
  count?: number;
  as?: string;
  className?: string;
}) => {
  const theme = useTheme();
  return (
    <PopoverTrigger
      variant="custom"
      css={filterButtonStyles(count)}
      endIcon={
        <Icon name="filter" color={theme.colors.greyFilterIcon} size={20} />
      }
      {...rest}>
      {children}
    </PopoverTrigger>
  );
};
