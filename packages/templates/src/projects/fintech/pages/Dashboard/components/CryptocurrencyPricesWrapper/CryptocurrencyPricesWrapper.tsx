import { CryptocurrencyPrices } from '@fintech/components';
import { useStatisticsInstrumentsWithPrices } from '@fintech/hooks';

export const CryptocurrencyPricesWrapper = () => {
  const instruments = useStatisticsInstrumentsWithPrices();
  return <CryptocurrencyPrices instrumentsList={instruments} />;
};
