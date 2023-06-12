import CardBase from './CardBase';

import { CardProps } from './types';

const Card = ({ children, ...props }: CardProps) => (
  <CardBase {...props}>{children}</CardBase>
);

export default Card;
