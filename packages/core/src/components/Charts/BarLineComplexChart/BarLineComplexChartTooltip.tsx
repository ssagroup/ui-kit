import React, { forwardRef } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { path } from '@ssa-ui-kit/utils';
import { useBarLineComplexChartContext } from './BarLIneComplexChart.context';
import TooltipContent from '@components/TooltipContent';
import { TooltipContentProps } from '@components/Tooltip/types';
import Wrapper from '@components/Wrapper';
import Checkbox from '@components/Checkbox';
import { useFullscreenMode } from '@components/FullscreenModeContext';

export const BarLineComplexChartTooltip = forwardRef<
  HTMLDivElement,
  Omit<TooltipContentProps, 'children'> & {
    onChange?: (itemName: string | number, selected: boolean) => void;
  }
>(function BarLineComplexChartTooltipContent({ onChange, ...rest }, refProp) {
  const {
    data,
    selected,
    barsSelected,
    linesSelected,
    isMaxBarsSelected,
    isMaxLinesSelected,
    setBarsSelected,
    setLinesSelected,
  } = useBarLineComplexChartContext();
  const { register } = useForm<FieldValues>();
  const theme = useTheme();
  const { isFullscreenMode } = useFullscreenMode();
  const handleChange =
    (itemType: string, itemName: string) => (isChecked: boolean) => {
      if (itemType === 'bar') {
        const newSelected = isChecked
          ? [...barsSelected, itemName]
          : barsSelected.filter((item) => item !== itemName);
        setBarsSelected(() => newSelected);
      } else {
        const newSelected = isChecked
          ? [...linesSelected, itemName]
          : linesSelected.filter((item) => item !== itemName);
        setLinesSelected(() => newSelected);
      }
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
        const isSelected = selected.includes(item.name || '');
        const isDisabled =
          !isSelected &&
          (item.type === 'bar' ? isMaxBarsSelected : isMaxLinesSelected);
        const itemOutput = (
          <React.Fragment key={`${item.name}-output`}>
            {color && (
              <div css={{ marginRight: 7 }}>
                {item.type === 'bar' ? (
                  <div
                    css={{
                      width: isFullscreenMode ? 10 : 8,
                      height: isFullscreenMode ? 10 : 8,
                      borderRadius: 3,
                      background: isDisabled ? theme.colors.greyFocused : color,
                    }}></div>
                ) : (
                  <div
                    css={{
                      width: 25,
                      height: 2,
                      borderRadius: 3,
                      background: isDisabled ? theme.colors.greyFocused : color,
                    }}></div>
                )}
              </div>
            )}
            {item.name}
          </React.Fragment>
        );

        return (
          <Wrapper key={item.name}>
            <Checkbox
              key={`bar-line-filter--checkbox-${item.name}`}
              register={register}
              name={'filters'}
              text={itemOutput}
              onChange={handleChange(item.type || '', item.name || '')}
              ref={undefined}
              externalState={isSelected}
              isDisabled={isDisabled}
              css={{
                display: 'flex',
                whiteSpace: 'nowrap',
                marginBottom: 0,
                lineHeight: isFullscreenMode ? '27px' : '20px',
                fontSize: isFullscreenMode ? 14 : 9.3,
                color: isDisabled
                  ? theme.colors.greyFocused
                  : theme.colors.greyDarker,
                '& input + div': {
                  width: isFullscreenMode ? 20 : 13.33,
                  height: isFullscreenMode ? 20 : 13.33,
                  borderRadius: isFullscreenMode ? 7 : 3,
                  marginRight: 7,
                  '&:before': {
                    width: isFullscreenMode ? 20 : 13.33,
                    height: isFullscreenMode ? 20 : 13.33,
                    borderRadius: isFullscreenMode ? 7 : 3,
                  },
                  '& svg': {
                    width: isFullscreenMode ? 12 : 9,
                    height: isFullscreenMode ? 12 : 9,
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
