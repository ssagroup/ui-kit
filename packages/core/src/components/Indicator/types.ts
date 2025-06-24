export interface IndicatorProps {
  isVisible: boolean;
  children: React.ReactElement<{ ref: React.Ref<HTMLDivElement | null> }>;
  position?: 'right' | 'left';
  background?: string;
  text?: string | number | React.JSX.Element;
}

export type ChildrenDataProps = Record<string, number>;
