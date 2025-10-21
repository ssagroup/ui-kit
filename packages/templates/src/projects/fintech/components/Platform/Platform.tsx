import { Wrapper } from '@ssa-ui-kit/core';

import { platformIcons } from './consts';
import { PlatformViewProps } from './types';

export const Platform = ({
  exchangeType,
  showTitle = true,
}: PlatformViewProps) => {
  if (!exchangeType) {
    return null;
  }

  const { icon, title } = platformIcons[exchangeType] || {};
  if (!showTitle) {
    return icon ? <img alt={title} src={icon} width={25} /> : null;
  }
  return (
    <Wrapper>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
        {icon ? <img alt={title} src={icon} width={25} /> : null}
      </div>
      {title}
    </Wrapper>
  );
};
