export interface IndicatorProps {
  isVisible: boolean;
  position?: 'right' | 'left';
  background?: string;
  text?: string | number | JSX.Element;
  children?: React.ReactNode;
}

export interface ChildrenDataProps {
  [key: string]: number;
}
