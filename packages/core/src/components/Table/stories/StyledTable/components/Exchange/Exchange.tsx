import Wrapper from '@components/Wrapper';
import { exchangeIcons } from './consts';
import { ExchangeProps } from './types';

export const Exchange = ({ exchangeType, showTitle = true }: ExchangeProps) => {
  const { icon: ExchangeIcon, title } = exchangeIcons[exchangeType];
  if (!showTitle) {
    return <ExchangeIcon />;
  }
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
