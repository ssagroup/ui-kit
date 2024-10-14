export type Enum = {
  key: string;
  localizedName: string;
  styles?: {
    backgroundColor: string;
    fontColor: string;
  };
  value?: {
    higher: string[];
    period: Array<{ upToHours: number; value: string }>;
  };
};

export type EnumsList =
  | 'accountTypes'
  | 'botStrategies'
  | 'colorsForBotStatuses'
  | 'noControlStatuses'
  | 'exchangePlatforms'
  | 'tradingAccounts'
  | 'periods';
