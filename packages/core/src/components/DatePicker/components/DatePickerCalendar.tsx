import { useTheme } from '@emotion/react';
import * as C from '../..';

export const DatePickerCalendar = () => {
  const theme = useTheme();
  return (
    <C.PopoverContent
      className="popover"
      css={{
        gap: 15,
        border: `2px solid ${theme.colors.turquoise}`,
        borderRadius: 15,
        padding: 15,
        width: 330,
        height: 350,
      }}>
      <C.PopoverHeading variant="h4">Popover heading</C.PopoverHeading>
      <C.PopoverDescription variant="body1">
        Popover description
      </C.PopoverDescription>
      <C.PopoverClose>Close</C.PopoverClose>
    </C.PopoverContent>
  );
};
