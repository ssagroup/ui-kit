import { ReactNode, forwardRef } from 'react';
import { renderToString } from 'react-dom/server';
import {
  FloatingPortal,
  FloatingFocusManager,
  useMergeRefs,
} from '@floating-ui/react';
import * as DOMPurify from 'dompurify';
import { TooltipArrow } from '@components/Tooltip/TooltipArrow';
import { TooltipContentBase } from '@components/Tooltip/TooltipContentBase';
import { ITooltipContentProps, TooltipSize } from '@components/Tooltip/types';
import { useTooltipContext } from '@components/Tooltip/useTooltipContext';
import { mapSizes } from '@components/Tooltip/utils';
import { ALLOWED_TAGS } from './constants';

const TooltipContent = forwardRef<HTMLDivElement, ITooltipContentProps>(
  function TooltipContent(
    {
      children,
      className,
      style,
      allowTags = false,
      allowedTags = ALLOWED_TAGS,
    },
    refProp,
  ) {
    const tooltipCtx = useTooltipContext();
    const ref = useMergeRefs([tooltipCtx?.refs.setFloating, refProp]);
    let output: string | ReactNode = '';

    if (allowTags) {
      const html = renderToString(children);
      const htmlSanitized = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: allowedTags,
      });
      output = <div dangerouslySetInnerHTML={{ __html: htmlSanitized }} />;
    } else {
      output = children;
    }

    return (
      <FloatingPortal>
        {tooltipCtx?.isOpen && (
          <FloatingFocusManager context={tooltipCtx.context} modal={false}>
            <TooltipContentBase
              {...tooltipCtx.getFloatingProps({
                ref,
                css:
                  tooltipCtx.size && mapSizes[tooltipCtx.size as TooltipSize],
                className,
                style: {
                  position: tooltipCtx.strategy,
                  top: tooltipCtx.y ?? 0,
                  left: tooltipCtx.x ?? 0,
                  width: 'max-content',
                  ...style,
                },
              })}>
              {tooltipCtx.hasArrow && (
                <TooltipArrow {...tooltipCtx.arrowProps} />
              )}
              {output}
            </TooltipContentBase>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    );
  },
);

export default TooltipContent;
