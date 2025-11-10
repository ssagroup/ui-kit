import React, { useEffect, useState } from 'react';

import Button from '@components/Button';
import Typography from '@components/Typography';

import { ButtonItem } from './styles';
import { ButtonGroupItem, ButtonGroupProps } from './types';

export const ButtonGroup = ({
  items,
  buttonStyles,
  selectedItem,
  externalState = selectedItem || items[0],
  onClick,
}: ButtonGroupProps) => {
  const [activeBtn, setActiveBtn] = useState(selectedItem || items[0]);
  const handleClick = (item: ButtonGroupItem) => () => {
    setActiveBtn(item);
    onClick(item);
  };

  useEffect(() => {
    setActiveBtn(externalState);
  }, [externalState]);

  return (
    <React.Fragment>
      {items.map((item) => {
        const isActive = activeBtn.id === item.id && !item.isDisabled;
        return (
          <Button
            key={item.id}
            aria-pressed={isActive}
            variant="secondary"
            size="small"
            isDisabled={item.isDisabled}
            aria-disabled={item.isDisabled}
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
