import { IconProps } from './types';
import IconsMap from './icons';

const Icon = ({ name, color = '#000', size, ...props }: IconProps) => {
  return <IconsMap name={name} color={color} size={size} {...props} />;
};
export default Icon;
