export interface BadgeProps {
  color?: keyof MainColors | string;
  size?: keyof MainSizes;
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}
