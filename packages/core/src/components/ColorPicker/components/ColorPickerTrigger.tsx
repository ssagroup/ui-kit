import { useTheme } from '@emotion/react';
import { Color } from '@rc-component/color-picker';
import Button from '@components/Button';
import { PopoverTrigger } from '@components/Popover';
import Wrapper from '@components/Wrapper';
import { useColorPickerContext } from '../ColorPickerContext';

export const ColorPickerTrigger = () => {
  const theme = useTheme();
  const { classnames, rawColor, label } = useColorPickerContext();
  return (
    <PopoverTrigger asChild className={classnames?.trigger}>
      <Button
        variant="tertiary"
        className={classnames?.button}
        css={{
          padding: 0,
          height: 20,
          minWidth: 20,
          fontSize: 16,
          fontWeight: 500,
          gap: 8,
        }}
        startIcon={
          <Wrapper
            css={{
              width: 20,
              height: 20,
              background: rawColor && new Color(rawColor).toRgbString(),
              borderRadius: 4,
              '&:hover': {
                border: `1px solid ${theme.colors.grey}`,
              },
            }}
          />
        }>
        {label}
      </Button>
    </PopoverTrigger>
  );
};
