import { Interpolation, Theme } from '@emotion/react';
import type { To } from 'react-router-dom';

export type WidgetCardProps = {
  title?: React.ReactNode;
  className?: string;
  css?: Interpolation<Theme>;
  wrapperClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  headerContent?: React.ReactNode;
  link?: To;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
};
