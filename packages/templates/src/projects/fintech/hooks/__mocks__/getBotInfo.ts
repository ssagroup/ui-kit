import { propOr } from '@ssa-ui-kit/utils';

import { Bot, RequestPeriod } from '@/fintech/types';

import * as mockResponse from './botInfoMock';

export const getBotInfoResponseMock = ({
  period,
}: {
  period: Pick<RequestPeriod, 'period'>;
}) =>
  propOr<typeof mockResponse, Bot>(
    mockResponse.Day,
    period.period,
  )(mockResponse);
