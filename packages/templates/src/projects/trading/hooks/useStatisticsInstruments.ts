import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClientReadableStream, StatusCode } from 'grpc-web';
import { useQuery } from '@tanstack/react-query';
import { propOr } from '@ssa-ui-kit/utils';
import * as API from '@trading/api';
import { Bot, InstrumentsList } from '@trading/types';
import * as exchangeServicePb from '@trading/services/ExchangeService/exchange_service_pb';
import { useExchangeService } from '@trading/services';
import { getAccessToken } from '@trading/api/tokens';
import { useBotInfo } from '@trading/pages/BotPage/hooks';

export const useStatisticsInstrumentsResponse = <
  T = API.StatisticsInstrumentsAPIResponse,
>(
  select?: (data: API.StatisticsInstrumentsAPIResponse) => T,
) => {
  const { id: botId } = useParams();
  return useQuery({
    queryKey: ['statistics-instruments'],
    queryFn: API.Statistics.getStatisticsInstruments,
    select,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: typeof botId === 'undefined',
  });
};

export const useTop3StatisticsInstrumentsResponse = () =>
  useStatisticsInstrumentsResponse((data) => {
    const items = propOr<
      API.StatisticsInstrumentsAPIResponse,
      API.StatisticsInstrumentsAPIResponse['result']
    >(
      [],
      'result',
    )(data);
    const top3Instruments = items.slice(0, 3);
    return {
      ...data,
      result: top3Instruments,
    };
  });

// use setInterval instead + clear?
export const useStatisticsInstrumentsWithPrices = () => {
  const statisticsInstrumentsResult = useTop3StatisticsInstrumentsResponse();
  const priceSubscribed: MutableRefObject<ClientReadableStream<exchangeServicePb.PriceSubscribeResponseMessage> | null> =
    useRef(null);
  const exchangeService = useExchangeService();
  const [instruments, setInstruments] = useState<InstrumentsList>([]);
  const [isFirstSubscribe, setIsFirstSubscribe] = useState(true);
  const botInfo = useBotInfo();
  const bot = propOr<typeof botInfo, Bot>({}, 'data')(botInfo);
  const isBotPage = !!bot.id;
  useEffect(() => {
    if (
      (statisticsInstrumentsResult.data?.result || isBotPage) &&
      isFirstSubscribe
    ) {
      setIsFirstSubscribe(false);
      const subscribeToPrice = () => {
        const request = new exchangeServicePb.PriceSubscribeRequestMessage();
        const instrumentsList: Array<exchangeServicePb.InstrumentRequestDto> =
          [];
        if (isBotPage) {
          const instrumentRequest =
            new exchangeServicePb.InstrumentRequestDto();
          instrumentRequest.setInstrument(bot.instrument as string);
          instrumentRequest.setPlatform(bot.platform as string);
          instrumentsList.push(instrumentRequest);
        } else {
          statisticsInstrumentsResult.data?.result.forEach((item) => {
            const instrumentRequest =
              new exchangeServicePb.InstrumentRequestDto();
            instrumentRequest.setInstrument(item.instrument);
            instrumentRequest.setPlatform(item.platform);
            instrumentsList.push(instrumentRequest);
          });
        }
        request.setInstrumentsList(instrumentsList);

        priceSubscribed.current = exchangeService.priceSubscribe(request, {
          Authorization: `Bearer ${getAccessToken()}`,
        });

        priceSubscribed.current?.on('data', (response) => {
          const instrumentsList = response.getInstrumentsList();
          const instrumentsCurrent: InstrumentsList = [];
          instrumentsList.forEach((instrument) => {
            instrumentsCurrent.push({
              platform: instrument.getPlatform(),
              instrument: instrument.getInstrument(),
              price: instrument.getPrice(),
              isIncreasing: true,
            });
          });
          setInstruments((prevState) => {
            const transformedState = instrumentsCurrent.map(
              (newItem, index) => {
                const prevPrice = prevState[index]?.price;
                const prevIsIncreasing = prevState[index]?.isIncreasing;
                const newPrice = newItem.price;
                const isIncreasing =
                  !prevPrice ||
                  newPrice > prevPrice ||
                  (prevPrice === newPrice &&
                    (prevIsIncreasing || prevIsIncreasing === undefined))
                    ? true
                    : false;

                return {
                  ...newItem,
                  isIncreasing,
                };
              },
            );
            return transformedState;
          });
        });

        priceSubscribed.current.on('status', (status) => {
          if (status.code === StatusCode.DEADLINE_EXCEEDED) {
            priceSubscribed.current?.cancel();
            subscribeToPrice();
          }
        });
      };

      if (!priceSubscribed.current) {
        subscribeToPrice();
      }
    }
    return () => {
      if (!isFirstSubscribe && priceSubscribed.current) {
        priceSubscribed.current.cancel();
        priceSubscribed.current = null;
      }
    };
  }, [statisticsInstrumentsResult.data?.result, isBotPage, isFirstSubscribe]);

  return instruments;
};
