import type { To } from 'react-router-dom';

export type WidgetCardProps = {
  title?: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  headerContent?: React.ReactNode;
  link?: To;
  children?: React.ReactNode;
  width?: string;
  onClick?: () => void;
};
