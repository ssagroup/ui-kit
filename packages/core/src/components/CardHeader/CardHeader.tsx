import { CommonProps } from '@global-types/emotion';
import CardHeaderBase from './CardHeaderBase';

export interface CardProps extends CommonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

const CardHeader = ({ children, icon, transparent, ...props }: CardProps) => (
  <CardHeaderBase transparent={transparent} hasIcon={!!icon} {...props}>
    {icon ? (
      <span
        style={{
          position: 'absolute',
          left: '-30px',
          top: '-30px',
        }}>
        {icon}
      </span>
    ) : null}
    {children}
  </CardHeaderBase>
);

export default CardHeader;
