import React from 'react';
import { Link } from 'react-router-dom';
import { Theme, css } from '@emotion/react';
import { CardBase } from '@ssa-ui-kit/core';
import { ITradingInfoCardWrapperProps } from './types';

const infoCardWrapper = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: max-content;
  min-width: 100%;
  background: ${theme.colors.greyLighter};
  padding: 4px 10px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: none;
  user-select: none;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow};
    content: '';
  }

  &:active {
    background: ${theme.colors.white};

    &::before {
      border-radius: 6px;
      box-shadow: 0 10px 40px 0 ${theme.colors.greyShadow24};
    }
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
        <Link to={link} css={infoCardWrapper}>
          {children}
        </Link>
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
