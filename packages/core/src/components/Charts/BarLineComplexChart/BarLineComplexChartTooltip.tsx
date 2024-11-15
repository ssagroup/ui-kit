import { forwardRef } from 'react';
import TooltipContent from '@components/TooltipContent';
import { TooltipContentProps } from '@components/Tooltip/types';
import Wrapper from '@components/Wrapper';

export const BarLineComplexChartTooltip = forwardRef<
  HTMLDivElement,
  Omit<TooltipContentProps, 'children'>
>(function BarLineComplexChartTooltipContent(props, refProp) {
  return (
    <TooltipContent ref={refProp} {...props}>
      <Wrapper
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          '& label': {
            marginLeft: 0,
          },
          '& input+div': {
            height: 28,
            '&:before': {
              top: 4,
            },
          },
        }}>
        {/* <Checkbox
          key={`bar-line-filter--checkbox-${permission.name}`}
          register={register}
          name={...}
          text={''}
          onChange={...}
          ref={undefined}
          externalState={...}
          css={{
            marginBottom: 0,
            '& input + div': { height: 44, '&:before': { top: 12 } },
            '& input:focus + div': { boxShadow: 'none' },
          }}
        /> */}
      </Wrapper>
    </TooltipContent>
  );
});
