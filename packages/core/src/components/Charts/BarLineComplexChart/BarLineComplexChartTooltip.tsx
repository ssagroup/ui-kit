import { forwardRef, Fragment } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { path } from '@ssa-ui-kit/utils';
import TooltipContent from '@components/TooltipContent';
import { TooltipContentProps } from '@components/Tooltip/types';
import Wrapper from '@components/Wrapper';
import Checkbox from '@components/Checkbox';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';

// Check the default undefined selected value
export const BarLineComplexChartTooltip = forwardRef<
  HTMLDivElement,
  Omit<TooltipContentProps, 'children'> & {
    onChange?: (itemName: string | number, selected: boolean) => void;
  }
>(function BarLineComplexChartTooltipContent({ onChange, ...rest }, refProp) {
  const { data, selected, setSelected } = useBarLineComplexChartContext();
  const { register } = useForm<FieldValues>();
  const handleChange = (itemName: string) => (isChecked: boolean) => {
    const newSelected = isChecked
      ? [...selected, itemName]
      : selected.filter((item) => item !== itemName);
    setSelected(newSelected);
    onChange?.(itemName, isChecked);
  };
  return (
    <TooltipContent
      ref={refProp}
      {...rest}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
      {data.map((item) => {
        const color = path(['marker', 'color'])(item) as string | undefined;
        const itemOutput = (
          <Fragment key={`${item.name}-output`}>
            {color && (
              <div css={{ marginRight: 7 }}>
                {item.type === 'bar' ? (
                  <div
                    css={{
                      width: 8,
                      height: 8,
                      borderRadius: 3,
                      background: color,
                    }}></div>
                ) : (
                  <div
                    css={{
                      width: 25,
                      height: 2,
                      borderRadius: 3,
                      background: color,
                    }}></div>
                )}
              </div>
            )}
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
              onChange={handleChange(item.name || '')}
              ref={undefined}
              externalState={item.selected}
              css={{
                display: 'flex',
                whiteSpace: 'nowrap',
                marginBottom: 0,
                lineHeight: '20px',
                fontSize: 9.3,
                '& input + div': {
                  width: 13.33,
                  height: 13.33,
                  marginRight: 7,
                  '&:before': { width: 13.33, height: 13.33, borderRadius: 3 },
                  '& svg': {
                    width: 9,
                    height: 9,
                    marginLeft: 1,
                  },
                },
                '& input:focus + div': { boxShadow: 'none' },
              }}
            />
          </Wrapper>
        );
      })}
    </TooltipContent>
  );
});
