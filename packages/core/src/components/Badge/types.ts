import { MainColors, MainSizes } from "../..";

export interface BadgeProps {
  color?: keyof MainColors;
  size?: keyof MainSizes;
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}
