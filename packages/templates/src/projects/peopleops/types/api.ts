import { Period } from '@peopleops/components/Events/types';

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

export interface SignInParams {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

export type UserPage = {
  isTopMenu: boolean;
  name: string;
  order: number;
  parentName: string | null;
  permissions: string[];
  title: string;
};

export type UserPages = Array<UserPage>;

export type SearchType = Record<
  string,
  string | number | boolean | Array<string> | null | undefined
>;

export interface EntraUser {
  userName: string;
  name: string;
  email: string;
  surname: string;
}

export type EntraUsers = EntraUser[];

export type DashboardIndicators = {
  indicators: {
    totalStaff: number;
    fte: number;
    utilization: number;
    resourcesOnBench: number;
    seniority: number;
    tenure: number;
    staffTurnover: number;
    benchAvailabilityPercentage: number;
  };
  diagrams: {
    employmentType: {
      contractors: number;
      contractorsPercentage: number;
      contractorsColor: string;
      staff: number;
      staffPercentage: number;
      staffColor: string;
    };
    genderType: {
      male: number;
      female: number;
      others: number;
      malePercentage: number;
      femalePercentage: number;
      othersPercentage: number;
      maleColor?: string;
      femaleColor?: string;
      othersColor?: string;
    };
    staffType: {
      administrative: number;
      administrativePercentage: number;
      administrativeColor: string;
      production: number;
      productionPercentage: number;
      productionColor: string;
    };
    workSchedule: {
      fullTime: number;
      partTime: number;
      fullTimePercentage: number;
      partTimePercentage: number;
      fullTimeColor?: string;
      partTimeColor?: string;
    };
  };
};

export type DashboardChartsTypes =
  | 'headCountByDepartmentChart'
  | 'seniorityInfoChart'
  | 'ageChart'
  | 'educationLevelChart';

export type DashboardGraphsTypes =
  | 'fteGraph'
  | 'headCountByFullCompanyGraph'
  | 'seniorityProductionEmployeesGraph';

export type EventItemInfo = {
  eventDate: string;
  personId: number;
  personName: string;
  avatarUrl: string;
};

export type EventInfo = {
  anniversaries: Array<EventItemInfo>;
  birthdays: Array<EventItemInfo>;
  trials: Array<EventItemInfo>;
  terminations: Array<EventItemInfo>;
};

export type DashboardCharts = {
  [K in DashboardChartsTypes]: Array<{
    caption: string;
    count: number;
    color: string;
  }>;
};

export type DashboardGraphsItem = {
  name: string;
  selected: boolean;
  type: 'scatter' | 'bar';
  color: string;
  values: number[];
  showOnHover?: boolean;
  valueDimension: string | null;
};

export type DashboardGraphs = {
  departmentsIndicatorsGraphs: Array<{
    departmentName: string;
    departmentGraphData: DashboardGraphsItem[];
  }>;
  fteGraph: DashboardGraphsItem[];
  headCountByFullCompanyGraph: DashboardGraphsItem[];
  seniorityProductionEmployeesGraph: DashboardGraphsItem[];
  productionAdministrativeGraph: DashboardGraphsItem[];
  utilizationGraph: DashboardGraphsItem[];
  resourcesOnBenchGraph: DashboardGraphsItem[];
  timeStamps: number[];
};

export type EventType =
  | 'trials'
  | 'birthdays'
  | 'anniversaries'
  | 'terminations'
  | 'newComers'
  | 'assessments';

export type DateRangesKeys =
  | 'today'
  | 'thisWeek'
  | 'nextWeek'
  | 'thisMonth'
  | 'nextMonth';

export type DateRanges = Record<DateRangesKeys, { start: Date; end: Date }>;

export type DashboardEvent = Record<EventType, Array<EventItemInfo>>;

export type DashboardEvents = Record<Period, DashboardEvent>;

export type PageGroupResponseItem = {
  name: string;
  order: number;
  id: number;
};

export type AllPermissionItem = {
  name: string;
  groupId: number | null;
  order: number;
  title: string;
};

export type FunctionalPermissionItem = {
  id: number;
  name: string;
  order: number;
  isPrimary: boolean;
};
