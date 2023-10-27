import { CommonProps } from '@global-types/emotion';

export interface CardProps extends CommonProps {
  noShadow?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
