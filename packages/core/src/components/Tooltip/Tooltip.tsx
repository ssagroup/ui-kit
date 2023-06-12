import { useTooltip } from './useTooltip';
import { TooltipContext } from './useTooltipContext';
import { ITooltipProps } from './types';

/*
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button />
 *   </TooltipTrigger>
 *   <TooltipContent>Tooltip</TooltipContent>
 * </Tooltip>
 * */
const Tooltip = ({ children, ...props }: ITooltipProps) => {
  const tooltip = useTooltip(props);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};
export default Tooltip;
