import * as Types from '@fintech/pages/BotsPage/types';

import { Wrapper } from '@ssa-ui-kit/core';

export const ROICell = ({ amount }: Types.ROI) => {
  const amountNumber = Number.parseFloat(amount.toFixed(2));
  const outputAmount = Math.abs(amountNumber);
  const outputSign = amountNumber > 0 ? '+' : amountNumber === 0 ? '' : '-';
  return (
    <Wrapper
      css={{
        width: 45,
      }}>
      <Wrapper
        css={{
          textAlign: 'right',
          marginRight: 5,
          width: 'auto',
          whiteSpace: 'nowrap',
        }}>
        <div
          css={{
            width: 10,
          }}>
          {outputSign}
        </div>
        <span>{outputAmount}%</span>
      </Wrapper>
    </Wrapper>
  );
};
