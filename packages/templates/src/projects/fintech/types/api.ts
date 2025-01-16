import {
  Balance,
  Bot,
  Enum,
  EnumsList,
  PeriodRange,
  StatisticsPeriod,
} from '@fintech/types';

export interface CommonAPIError<D = unknown | null, V = string[] | null> {
  code: number;
  message: string;
  details: D;
  validationErrors: V;
}

export interface CommonAPIResponse<
  R = unknown,
  D = unknown | null,
  V = string[] | null,
> {
  targetUrl?: string | null;
  success?: boolean;
  unAuthorizedRequest?: boolean;
  result: R;
  error?: CommonAPIError<D, V>;
}

export type APIListResponse<
  I,
  E = unknown,
  D = unknown | null,
  V = string[] | null,
> = CommonAPIResponse<
  {
    items: I[];
    totalCount: number;
  } & E,
  D,
  V
>;

export type EnumsApiListResponse<
  D = unknown | null,
  V = string[] | null,
> = CommonAPIResponse<Record<EnumsList, Array<Enum>>, D, V>;

export type EnumsApiAllowedCoinsResponse<
  D = unknown | null,
  V = string[] | null,
> = CommonAPIResponse<Array<string>, D, V>;

export type SingleBotResponse = CommonAPIResponse<Bot>;

export interface SingUpParams {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export type ResetPasswordParams = Pick<SingUpParams, 'email'>;

export interface ChangePasswordParams {
  userId: string | null;
  token: string | null;
  newPassword: string;
  passwordConfirm: string;
}

export type NotificationsGetAllParams = {
  SkipCount?: number;
  MaxResultCount?: number;
  UnreadOnly?: boolean;
};

export type NotificationsGetAllRespProps = {
  unreadCount: number;
  readCount: number;
};

export type NotificationsReadManyParams = {
  ids: number[];
};

export type StatisticsGetParams = {
  period?: StatisticsPeriod;
  periodRange?: PeriodRange;
};

export type StatisticsInstrumentsItem = {
  instrument: string;
  platform: string;
};

export type BotVersionsItem = {
  tag: string;
  buildNumber: string;
  message: string;
  timestamp: string;
};

export type StatisticsInstrumentsList = Array<StatisticsInstrumentsItem>;

export type StatisticsInstrumentsAPIResponse =
  CommonAPIResponse<StatisticsInstrumentsList>;

export type AccountInfoAPIResponse = CommonAPIResponse<Balance>;

export type EnumsAllowedCoinsAPIResponse = CommonAPIResponse<Array<string>>;

export type BotVersionsAPIResponse = Array<BotVersionsItem>;
