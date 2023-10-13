export interface ActivityItemProps {
  id?: string;
  activity: string;
  date: string;
  day?: string;
  max: number;
  currentValue: number;
}

export type ActivityResp = { [key: string]: ActivityItemProps[] };
