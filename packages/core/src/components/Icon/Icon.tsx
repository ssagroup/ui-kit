import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import { IconProps } from './types';
import IconsMap from './icons';

const Icon = ({ name, color = '#000', size, tooltip, ...props }: IconProps) => {
  const icon = (
    <IconsMap
      name={name}
      color={color}
      size={size}
      {...(tooltip ? { 'aria-label': tooltip } : {})}
      {...props}
    />
  );

  if (!tooltip) {
    return icon;
  }

  return (
    <Tooltip enableHover enableClick={false}>
      <TooltipTrigger>
        <span style={{ display: 'inline-flex' }}>{icon}</span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};
export default Icon;
