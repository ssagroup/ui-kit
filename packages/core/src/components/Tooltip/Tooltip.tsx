import { useTooltip } from './useTooltip';
import { TooltipContext } from './useTooltipContext';
import { TooltipProps } from './types';

/*
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button />
 *   </TooltipTrigger>
 *   <TooltipContent>Tooltip</TooltipContent>
 * </Tooltip>
 * */
const Tooltip = ({ children, ...props }: TooltipProps) => {
  const tooltip = useTooltip(props);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};
export default Tooltip;
