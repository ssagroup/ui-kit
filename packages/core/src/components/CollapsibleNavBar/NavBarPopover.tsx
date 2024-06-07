import { useEffect, useState } from 'react';
import { offset } from '@floating-ui/react';
import { useTheme } from '@emotion/react';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '@components';
import { useWindowSize } from '@ssa-ui-kit/hooks';

export const CollapsibleNavBarPopover = ({
  triggerIcon,
  title,
  content,
}: {
  triggerIcon: React.ReactElement;
  title: string;
  content?: React.ReactElement;
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const { width } = useWindowSize();

  useEffect(() => {
    setOpen(false);
  }, [width]);

  return (
    <Popover
      floatingOptions={{
        onOpenChange,
        open,
        middleware: [
          offset({
            mainAxis: 37,
          }),
        ],
      }}
      placement="right-start"
      interactionsEnabled="both">
      <PopoverTrigger
        variant="custom"
        dataTestId="collapsible-nav-bar-trigger-button"
        css={{
          height: 'auto',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          backgroundColor: 'unset',
          borderRadius: 0,
        }}
        startIcon={triggerIcon}
      />
      <PopoverContent
        css={{
          [theme.mediaQueries.xs]: {
            display: 'none',
          },
          [theme.mediaQueries.md]: {
            display: 'block',
          },
          zIndex: 2,
        }}
        isFocusManagerDisabled={true}>
        <PopoverHeading
          css={{
            color: theme.colors.white,
            fontSize: 12,
            padding: '3px 5px 5px 5px',
            background: theme.colors.greyGraphite,
            borderRadius: 5,
            cursor: 'default',
            marginBottom: 1,
            width: 'auto',
            whiteSpace: 'nowrap',
            '&::before': {
              content: '""',
              display: 'block',
              background: 'rgba(71, 74, 80, 1)',
              borderRadius: 2,
              position: 'absolute',
              width: 9,
              height: 9,
              top: 7,
              left: -4,
              transform: 'rotate(45deg)',
              zIndex: -1,
            },
          }}>
          {title}
        </PopoverHeading>
        <PopoverDescription
          css={{
            '& > div': {
              padding: 0,
              background: theme.colors.greyGraphite,
              borderRadius: 5,
              width: 85,
              '& > a': {
                color: theme.colors.white,
                padding: 5,
                fontSize: 12,
                fontWeight: 400,
                '&:first-of-type': {
                  paddingTop: 5,
                },
                '&:hover': {
                  background: '#62656B',
                },
              },
            },
          }}>
          {content}
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
