import CardBase from './CardBase';
import { CardProps } from './types';

const Card = ({ children, onClick, ...props }: CardProps) => {
  return (
    <CardBase {...props} as={onClick ? 'button' : 'div'} onClick={onClick}>
      {children}
    </CardBase>
  );
};

export default Card;
