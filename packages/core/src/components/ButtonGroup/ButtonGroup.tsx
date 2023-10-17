import React, { useState } from 'react';
import { Theme, css } from '@emotion/react';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { ButtonGroupProps, Item } from './types';

const ButtonItem = (theme: Theme) => css`
  height: auto;
  padding: 12px;
  border-radius: 0;
  box-shadow: none;
  user-select: none;

  &:hover,
  &:focus,
  &:active {
    box-shadow: none;
  }

  &:first-of-type {
    border-radius: 6px 0 0 6px;
  }

  &:last-child {
    border-radius: 0 6px 6px 0;
  }

  &:not(:last-child) {
    margin-right: 1px;
  }

  &.active {
    pointer-events: none;
    background: ${theme.colors.greyFocused};
  }
`;

export const ButtonGroup = ({
  items,
  className,
  onClick,
}: ButtonGroupProps) => {
  const [activeBtn, setActiveBtn] = useState(items[0]);
  const handleClick = (item: Item) => {
    setActiveBtn(item);
    onClick(item);
  };

  return (
    <React.Fragment>
      {items.map((item) => {
        const isActive = activeBtn.id === item.id;
        return (
          <Button
            key={item.id}
            aria-pressed={isActive}
            variant="secondary"
            size="small"
            onClick={() => handleClick(item)}
            css={[ButtonItem, className]}
            className={isActive ? 'active' : ''}>
            <Typography variant="subtitle">{item.text}</Typography>
          </Button>
        );
      })}
    </React.Fragment>
  );
};
