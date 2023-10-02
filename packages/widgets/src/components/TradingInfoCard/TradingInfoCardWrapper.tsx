import React from 'react';
import { Theme, css } from '@emotion/react';
import { CardBase } from '@ssa-ui-kit/core';
import { ITradingInfoCardWrapperProps } from './types';

const LinkCard = CardBase.withComponent('a');

const infoCardWrapper = (theme: Theme) => css`
  align-items: flex-start;
  width: max-content;
  min-width: 100%;
  background: ${theme.colors.greyLighter};
  padding: 4px 10px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
  user-select: none;

  &:active {
    background: ${theme.colors.white};
    box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow24};
  }
`;

const TradingInfoCardWrapper = ({
  onClick,
  link,
  children,
}: ITradingInfoCardWrapperProps) => {
  return (
    <React.Fragment>
      {link ? (
        <LinkCard href={link} css={infoCardWrapper}>
          {children}
        </LinkCard>
      ) : (
        <CardBase
          role={onClick ? 'button' : 'region'}
          tabIndex={onClick ? 0 : -1}
          onClick={() => {
            if (typeof onClick === 'function') {
              onClick();
            }
          }}
          css={infoCardWrapper}>
          {children}
        </CardBase>
      )}
    </React.Fragment>
  );
};

export default TradingInfoCardWrapper;
