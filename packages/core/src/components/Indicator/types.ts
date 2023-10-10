export interface IndicatorProps {
  isVisible: boolean;
  children: React.ReactElement;
  position?: 'right' | 'left';
  background?: string;
  text?: string | number | JSX.Element;
}

export type ChildrenDataProps = Record<string, number>;
