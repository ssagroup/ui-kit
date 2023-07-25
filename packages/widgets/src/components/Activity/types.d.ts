export interface ActivityItemProps {
  id?: string;
  activity: string;
  date: string;
  day?: string;
  max: number;
  currentValue: number;
}
interface ActivityProps {
  data: {
    [key: string]: ActivityItemProps[];
  };
}
export type ActivityResp = { [key: string]: ActivityItemProps[] };
