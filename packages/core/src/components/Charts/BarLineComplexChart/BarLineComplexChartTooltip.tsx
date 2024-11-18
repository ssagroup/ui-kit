import { forwardRef, Fragment } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import TooltipContent from '@components/TooltipContent';
import { TooltipContentProps } from '@components/Tooltip/types';
import Wrapper from '@components/Wrapper';
import Checkbox from '@components/Checkbox';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';

export const BarLineComplexChartTooltip = forwardRef<
  HTMLDivElement,
  Omit<TooltipContentProps, 'children'>
>(function BarLineComplexChartTooltipContent(props, refProp) {
  const { data } = useBarLineComplexChartContext();
  const { register } = useForm<FieldValues>();
  return (
    <TooltipContent
      ref={refProp}
      {...props}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
      {data.map((item) => {
        const itemOutput = (
          <Fragment key={`${item.name}-output`}>
            <div css={{ margin: '0 7px' }}>
              {item.type === 'bar' ? (
                <div
                  css={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: '#02499a',
                  }}></div>
              ) : (
                <div
                  css={{
                    width: 25,
                    height: 3,
                    background: '#F99',
                    borderRadius: 3,
                  }}></div>
              )}
            </div>
            {item.name}
          </Fragment>
        );

        return (
          <Wrapper key={item.name}>
            <Checkbox
              key={`bar-line-filter--checkbox-${item.name}`}
              register={register}
              name={'filters'}
              text={itemOutput}
              // onChange={...}
              ref={undefined}
              // externalState={...}
              css={{
                display: 'flex',
                whiteSpace: 'nowrap',
                marginBottom: 0,
                '& input + div': { height: 44, '&:before': { top: 12 } },
                '& input:focus + div': { boxShadow: 'none' },
              }}
            />
          </Wrapper>
        );
      })}
    </TooltipContent>
  );
});
