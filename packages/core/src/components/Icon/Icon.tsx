import { IconProps } from './types';
import IconsMap from './icons';

const Icon = ({ name, color = '#000', size, tooltip, ...props }: IconProps) => {
  return (
    <IconsMap
      name={name}
      color={color}
      size={size}
      tooltip={tooltip}
      {...props}
    />
  );
};
export default Icon;
