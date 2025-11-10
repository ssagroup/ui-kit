import { useTheme } from '@emotion/react';

import { PopoverOptions } from '../types';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '..';

export const StoryComponent = ({
  interactionsEnabled = 'click',
}: Pick<PopoverOptions, 'interactionsEnabled'>) => {
  const theme = useTheme();
  return (
    <div
      css={{
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Popover interactionsEnabled={interactionsEnabled}>
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
