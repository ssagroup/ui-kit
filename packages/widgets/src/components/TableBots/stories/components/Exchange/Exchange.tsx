import { ExchangeProps } from './types';

import { pathOr } from '@ssa-ui-kit/utils';
import { Wrapper } from '@ssa-ui-kit/core';
import { exchangeIcons, ExchangeIconsType } from './consts';

export const Exchange = ({ exchangeType }: ExchangeProps) => {
  const ExchangeIcon = exchangeIcons[exchangeType]['icon'];
  const title = pathOr<ExchangeIconsType, string>('', [exchangeType, 'title'])(
    exchangeIcons,
  );
  return (
    <Wrapper>
      <div
        css={{
          display: 'flex',
          width: 25,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
        <ExchangeIcon />
      </div>
      {title}
    </Wrapper>
  );
};
