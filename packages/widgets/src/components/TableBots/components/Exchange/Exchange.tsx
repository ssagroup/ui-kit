import { ExchangeProps } from './types';

import { ExchangeIcons, ExchangeIconsType } from './ExchangeIcons';
import { pathOr } from '@ssa-ui-kit/utils';
import { Wrapper } from '@ssa-ui-kit/core';

export const Exchange = ({ exchangeType }: ExchangeProps) => {
  const Component = ExchangeIcons[exchangeType]['icon'];
  const title = pathOr<ExchangeIconsType, string>('', [exchangeType, 'title'])(
    ExchangeIcons,
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
        <Component />
      </div>
      {title}
    </Wrapper>
  );
};
