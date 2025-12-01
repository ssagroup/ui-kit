import React from 'react';
import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import { ImageItem } from '@components/ImageItem';
import { PersonInfoCounterProps } from './types';

import * as S from './styles';

export const PersonInfoCounter: React.FC<PersonInfoCounterProps> = ({
  counterTooltip,
  css,
}) => {
  const tooltipUsers = counterTooltip?.users ?? [];
  const hasTooltipUsers = tooltipUsers.length > 0;
  const counterValue = hasTooltipUsers ? `+${tooltipUsers.length}` : null;

  if (!counterValue) {
    return null;
  }

  const tooltipBody = (
    <S.CounterTooltipList data-testid="person-info-counter-tooltip-list">
      {tooltipUsers.map((user, index) => (
        <ImageItem
          key={user.id ?? `${user.name}-${index}`}
          image={user.avatar}
          link={user.link}
          openLinkInNewTab={user.openLinkInNewTab}>
          {user.name}
        </ImageItem>
      ))}
    </S.CounterTooltipList>
  );

  const counterNode = (
    <S.Counter css={css} data-testid="person-info-counter">
      {counterValue}
    </S.Counter>
  );

  return (
    <Tooltip
      enableHover
      enableClick={false}
      allowHoverContent
      placement="top"
      size="medium"
      hasArrow>
      <TooltipTrigger>{counterNode}</TooltipTrigger>
      <TooltipContent>
        <S.CounterTooltipContent>{tooltipBody}</S.CounterTooltipContent>
      </TooltipContent>
    </Tooltip>
  );
};
