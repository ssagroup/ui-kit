import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ClientReadableStream, StatusCode } from 'grpc-web';
import { InstrumentSingle, WeightedMeanPrices } from '@trading/types';
import * as exchangeServicePb from '@trading/services/ExchangeService/exchange_service_pb';
import { useExchangeService } from '@trading/services';
import { getAccessToken } from '@trading/api/tokens';

export const useInstrumentInfoWithPrices = (props: WeightedMeanPrices) => {
  // Ref to hold the subscription stream
  const priceSubscribed: MutableRefObject<ClientReadableStream<exchangeServicePb.PriceSubscribeResponseMessage> | null> =
    useRef(null);
  // Access the exchange service instance
  const exchangeService = useExchangeService();
  // State to store instrument information
  const [instrumentInfo, setInstrumentInfo] = useState<InstrumentSingle>({
    platform: props.platform,
    instrument: props.instrument,
    price: '',
    isIncreasing: null,
  });
  // State to manage initial subscription flag
  const [isFirstSubscribe, setIsFirstSubscribe] = useState(true);

  useEffect(() => {
    // Effect runs when isFirstSubscribe changes
    if (isFirstSubscribe) {
      // If first subscribe, mark as not first for subsequent renders
      setIsFirstSubscribe(false);
    }
    // Function to subscribe to price updates
    const subscribeToPrice = () => {
      // Create a new request message for price subscription
      const request = new exchangeServicePb.PriceSubscribeRequestMessage();
      // Prepare instruments list based on props for the request
      const instrumentsList: Array<exchangeServicePb.InstrumentRequestDto> = [];
      const instrumentRequest = new exchangeServicePb.InstrumentRequestDto();
      instrumentRequest.setInstrument(props.instrument);
      instrumentRequest.setPlatform(props.platform);
      instrumentsList.push(instrumentRequest);
      request.setInstrumentsList(instrumentsList);
      // Subscribe to price updates from the exchange service
      priceSubscribed.current = exchangeService.priceSubscribe(request, {
        Authorization: `Bearer ${getAccessToken()}`,
      });
      // Handle incoming price data
      priceSubscribed.current.on('data', (response) => {
        // Extract instruments from response
        const instrumentsList = response.getInstrumentsList();
        let instrumentsCurrent: InstrumentSingle;
        // Iterate through instruments and update current instrument info
        instrumentsList.forEach((instrument) => {
          instrumentsCurrent = {
            platform: instrument.getPlatform(),
            instrument: instrument.getInstrument(),
            price: instrument.getPrice(),
            isIncreasing: true,
          };
        });
        // Update instrument info state based on new price data
        setInstrumentInfo((prevState) => {
          const prevPrice = prevState?.price;
          const prevIsIncreasing = prevState?.isIncreasing;
          const newPrice = instrumentsCurrent.price;
          // Calculate if price is increasing or not
          const isIncreasing =
            !prevPrice ||
            newPrice > prevPrice ||
            (prevPrice === newPrice &&
              (prevIsIncreasing || prevIsIncreasing === undefined))
              ? true
              : false;
          // Prepare updated instrument information state
          const transformedState = {
            ...instrumentsCurrent,
            isIncreasing,
          };
          return transformedState;
        });
      });
      // Handle status updates from the subscription
      priceSubscribed.current.on('status', (status) => {
        if (status.code === StatusCode.DEADLINE_EXCEEDED) {
          priceSubscribed.current?.cancel();
          subscribeToPrice(); // Resubscribe to maintain continuous updates
        }
      });
    };
    // Start subscription if not already subscribed
    if (!priceSubscribed.current) {
      subscribeToPrice();
    }
    // Cleanup function to cancel subscription on unmount or state change
    return () => {
      if (!isFirstSubscribe && priceSubscribed.current) {
        priceSubscribed.current.cancel();
        priceSubscribed.current = null;
      }
    };
  }, [isFirstSubscribe]);
  // Return current instrument information state
  return instrumentInfo;
};
