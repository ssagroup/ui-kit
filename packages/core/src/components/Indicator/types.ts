export interface indicatorProps {
  position?: 'right' | 'left';
  background?: string;
  text?: string | number | JSX.Element;
  children?: React.ReactNode;
}

export interface childrenDataProps {
  // top?: number;
  // left?: number;
  // width?: number;
  [key: string]: number;
}
