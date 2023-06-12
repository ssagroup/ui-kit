import { IconProps } from './Icons.types';
import IconsMap from './icons';

const Icon = ({ name, color = '#000', size = 24 }: IconProps) => {
  return <IconsMap name={name} color={color} size={size} />;
};
export default Icon;
