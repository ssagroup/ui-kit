interface LabelItemProps {
  value: number;
  position?: string;
  vertical?: boolean;
}

export interface ProgressLegendProps {
  vertical?: boolean;
  children:
    | React.ReactElement<React.PropsWithChildren<LabelItemProps>>[]
    | React.ReactElement<React.PropsWithChildren<LabelItemProps>>;
}
