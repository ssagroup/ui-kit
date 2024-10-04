import { CryptocurrencyPrices } from '@trading/components';
import { useStatisticsInstrumentsWithPrices } from '@trading/hooks';

export const CryptocurrencyPricesWrapper = () => {
  const instruments = useStatisticsInstrumentsWithPrices();
  return <CryptocurrencyPrices instrumentsList={instruments} />;
};
