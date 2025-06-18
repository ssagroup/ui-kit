import { useTheme } from '@emotion/react';
import {
  Button,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Theme,
  usePopoverContext,
} from '@ssa-ui-kit/core';

import { Panel } from '@shared/panel';

export type PanelControlProps = {
  panel: Panel;
  onRemove?: (panel: Panel) => void;
  onEdit?: (panel: Panel) => void;
};

export const PanelControlContent = ({
  panel,
  onEdit,
  onRemove,
}: PanelControlProps) => {
  const theme = useTheme() as Theme;
  const popover = usePopoverContext();

  const handleClose = () => {
    popover.setOpen(false);
  };

  return (
    <PopoverContent
      css={{
        gap: 15,
        alignItems: 'start',
        border: `2px solid ${theme.colors.greyLighter}`,
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: 15,
      }}>
      <Button
        variant="tertiary"
        css={{ gap: 5, width: '100%' }}
        onClick={() => {
          onEdit?.(panel);
          handleClose();
        }}
        startIcon={<Icon name="edit" size={14} />}>
        Edit
      </Button>
      <Button
        variant="tertiary"
        css={{ gap: 5, width: '100%' }}
        onClick={() => {
          onRemove?.(panel);
          handleClose();
        }}
        startIcon={<Icon name="bin" size={14} />}>
        Remove
      </Button>
    </PopoverContent>
  );
};

export const PanelControl = (props: PanelControlProps) => {
  return (
    <Popover>
      <PopoverTrigger variant="tertiary">
        <Icon name="more-vertical" size={14} />
      </PopoverTrigger>
      <PanelControlContent {...props} />
    </Popover>
  );
};
