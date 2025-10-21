import React, { isValidElement } from 'react';

import { CardBase, WithLink } from '@ssa-ui-kit/core';

import {
  ExchangeAccountContent,
  ExchangeAccountHeader,
  ExchangeAccountPlatform,
  ExchangeAccountProvider,
  ExchangeAccountStatus,
  ExchangeAccountTitle,
} from './components';
import * as S from './styles';
import { ExchangeAccountProps } from './types';

export const ExchangeAccount = ({
  platform,
  title,
  status,
  link,
  data,
  children,
  pieChartProps,
  disabled = false,
  onClick,
  onDelete,
}: ExchangeAccountProps) => {
  const seen = {
    header: false,
    status: false,
    content: false,
  };

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  childrenArray.forEach((children) => {
    if (isValidElement(children)) {
      const type = children.type;
      if (type === ExchangeAccountHeader) {
        seen.header = true;
      } else if (type === ExchangeAccountStatus) {
        seen.status = true;
      } else if (type === ExchangeAccountContent) {
        seen.content = true;
      }
    }
  });

  if (!seen.header) {
    childrenArray.unshift(
      <ExchangeAccountHeader key="header">
        <ExchangeAccountPlatform>{platform}</ExchangeAccountPlatform>
        <ExchangeAccountTitle>{title}</ExchangeAccountTitle>
      </ExchangeAccountHeader>,
    );
  }
  if (!seen.content) {
    childrenArray.push(<ExchangeAccountContent key="content" />);
  }
  if (!seen.status) {
    const headerIndex = childrenArray.findIndex(
      (child) => isValidElement(child) && child.type === ExchangeAccountHeader,
    );
    childrenArray.splice(
      headerIndex + 1,
      0,
      <ExchangeAccountStatus key="status" />,
    );
  }

  const _onClick = !disabled ? onClick : undefined;

  return (
    <ExchangeAccountProvider
      value={{
        data,
        platform,
        title,
        status,
        disabled,
        pieChartProps,
        onDelete,
        onClick,
      }}>
      <WithLink link={!disabled ? link : undefined} onClick={_onClick}>
        <CardBase
          noShadow
          css={S.CardBase({ disabled })}
          data-testid="card"
          onClick={link ? undefined : _onClick}>
          {childrenArray}
        </CardBase>
      </WithLink>
    </ExchangeAccountProvider>
  );
};

ExchangeAccount.Header = ExchangeAccountHeader;
ExchangeAccount.Platform = ExchangeAccountPlatform;
ExchangeAccount.Title = ExchangeAccountTitle;
ExchangeAccount.Status = ExchangeAccountStatus;
ExchangeAccount.Content = ExchangeAccountContent;
