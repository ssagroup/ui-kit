import { Typography } from '@ssa-ui-kit/core';

import * as S from '../styles';
import { ExchangeAccountProps } from '../types';

import { useExchangeAccountContext } from './ExchangeAccountProvider';

export interface ExchangeAccountStatusProps {
  isActive?: boolean;
  children?:
    | React.ReactNode
    | ((status: ExchangeAccountProps['status']) => React.ReactNode);
}

export const ExchangeAccountStatus = ({
  isActive,
  children,
}: ExchangeAccountStatusProps) => {
  const { status } = useExchangeAccountContext();
  const _isActive = isActive ?? status === 'Active';
  let _children = typeof children === 'function' ? children(status) : children;

  const statusStr = _isActive ? 'Active' : 'Not available';

  _children = _children ?? statusStr;
  if (!_children) {
    return;
  }

  return (
    <Typography
      css={S.Status}
      className={_isActive ? 'active' : 'not-available'}
      variant="body1"
      weight="regular">
      {_children}
    </Typography>
  );
};
