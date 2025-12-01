import React from 'react';
import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import { ImageItem } from '@components/ImageItem';
import * as S from './styles';
import { PersonInfoValueProps } from './types';

export const PersonInfoValue: React.FC<PersonInfoValueProps> = ({
  value,
  counterTooltip,
  css,
  counterCss,
  linkAttributes,
}) => {
  const isLink = Boolean(linkAttributes?.href);
  const tooltipUsers = counterTooltip?.users ?? [];
  const hasTooltipUsers = tooltipUsers.length > 0;
  const counterValue = hasTooltipUsers ? `+${tooltipUsers.length}` : null;

  const tooltipBody = hasTooltipUsers ? (
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
  ) : null;

  const renderCounter = () => {
    if (!counterValue || !tooltipBody) {
      return null;
    }

    const counterNode = (
      <S.Counter css={counterCss} data-testid="person-info-counter">
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

  return (
    <S.TextBase
      css={[isLink ? S.personInfoValueLinkStyles : undefined, css]}
      {...(linkAttributes ?? {})}>
      {value}
      {renderCounter()}
    </S.TextBase>
  );
};
