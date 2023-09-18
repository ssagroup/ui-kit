import { useTheme } from '@emotion/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeading,
  PopoverDescription,
  PopoverClose,
} from '..';

export const StoryComponent = () => {
  const theme = useTheme();
  return (
    <div
      css={{
        height: '300vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent
          className="popover"
          css={{
            gap: 15,
            border: `2px solid ${theme.colors.turquoise}`,
            borderRadius: 15,
            padding: 15,
          }}>
          <PopoverHeading variant="h4">Popover heading</PopoverHeading>
          <PopoverDescription variant="body1">
            Popover description
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
};
