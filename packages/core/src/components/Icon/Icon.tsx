import IconsMap from './icons';
import { IconProps } from './types';

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
