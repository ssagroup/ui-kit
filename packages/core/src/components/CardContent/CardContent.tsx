import { CommonProps } from '@global-types/emotion';
import CardContentBase from './CardContentBase';

export interface CardProps extends CommonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  className?: string;
  ariaLabelledby?: string;
  role?: string;
}

const CardContent = ({ children, ...props }: CardProps) => (
  <CardContentBase {...props}>{children}</CardContentBase>
);

export default CardContent;
