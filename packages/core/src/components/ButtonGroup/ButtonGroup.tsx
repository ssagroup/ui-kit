import React, { useState } from 'react';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { ButtonGroupProps, ButtonGroupItem } from './types';
import { ButtonItem } from './styles';

export const ButtonGroup = ({
  items,
  buttonStyles,
  onClick,
}: ButtonGroupProps) => {
  const [activeBtn, setActiveBtn] = useState(items[0]);
  const handleClick = (item: ButtonGroupItem) => () => {
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
            onClick={handleClick(item)}
            css={[ButtonItem, buttonStyles]}
            className={isActive ? 'active' : ''}>
            <Typography variant="body1">{item.text}</Typography>
          </Button>
        );
      })}
    </React.Fragment>
  );
};
