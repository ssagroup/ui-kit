import { useEffect, useState } from 'react';
import { offset } from '@floating-ui/react';
import { useTheme } from '@emotion/react';
import { useWindowSize } from '@ssa-ui-kit/hooks';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '@components/Popover';
import { useCollapsibleNavBarContext } from '../CollapsibleNavBarContext';

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
  const { theme: navBarTheme } = useCollapsibleNavBarContext();
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
          zIndex: 20,
        }}
        isFocusManagerDisabled={true}>
        <PopoverHeading
          css={{
            color:
              navBarTheme === 'default'
                ? theme.colors.white
                : theme.colors.greyGraphite,
            fontSize: 12,
            padding: '3px 5px 5px 5px',
            background:
              navBarTheme === 'default' ? theme.colors.greyGraphite : '#F4F5F9',
            borderRadius: 5,
            cursor: 'default',
            marginBottom: 1,
            width: 'auto',
            whiteSpace: 'nowrap',
            '&::before': {
              content: '""',
              display: 'block',
              background:
                navBarTheme === 'default'
                  ? theme.colors.greyGraphite
                  : '#F4F5F9',
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
              background:
                navBarTheme === 'default'
                  ? theme.colors.greyGraphite
                  : '#F4F5F9',
              borderRadius: 5,
              minWidth: 85,
              '& > a': {
                color:
                  navBarTheme === 'default'
                    ? theme.colors.white
                    : theme.colors.greyDarker80,
                padding: 5,
                whiteSpace: 'nowrap',
                fontSize: 12,
                fontWeight: navBarTheme === 'default' ? 400 : 500,
                '&.active': {
                  filter: 'none',
                },
                '&:first-of-type': {
                  paddingTop: 5,
                },
                '&:hover': {
                  background:
                    navBarTheme === 'default'
                      ? theme.colors.greyGraphite
                      : theme.colors.greyOutline,
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
