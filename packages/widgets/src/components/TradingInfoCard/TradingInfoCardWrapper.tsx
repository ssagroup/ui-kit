import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { CardBase } from '@ssa-ui-kit/core';
import { TradingInfoCardWrapperProps } from './types';

const InfoCardWrapper = styled.div<{ onClick?: () => void; to?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: max-content;
  min-width: 100%;
  background: ${({ theme }) => theme.colors.greyLighter};
  padding: 4px 10px;
  border-radius: 6px;
  text-decoration: none;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  white-space: nowrap;
  box-shadow: none;
  user-select: ${({ onClick }) => (onClick ? 'none' : 'auto')};

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 40px 0 ${({ theme }) => theme.colors.greyShadow};
    content: '';
  }

  &:active {
    background: ${({ theme }) => theme.colors.white};

    &::before {
      border-radius: 6px;
      box-shadow: 0 10px 40px 0 ${({ theme }) => theme.colors.greyShadow24};
    }
  }
`;

const TradingInfoCardWrapper = ({
  onClick,
  link,
  children,
}: TradingInfoCardWrapperProps) => {
  return (
    <React.Fragment>
      {link ? (
        <InfoCardWrapper as={Link} to={link}>
          {children}
        </InfoCardWrapper>
      ) : (
        <InfoCardWrapper
          as={CardBase}
          role={onClick ? 'button' : 'region'}
          tabIndex={onClick ? 0 : -1}
          onClick={onClick}>
          {children}
        </InfoCardWrapper>
      )}
    </React.Fragment>
  );
};

export default TradingInfoCardWrapper;
