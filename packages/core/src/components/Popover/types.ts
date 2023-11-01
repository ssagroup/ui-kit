import {
  Placement,
  useInteractions,
  UseFloatingReturn,
  UseFloatingOptions,
} from '@floating-ui/react';

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  floatingOptions?: Partial<UseFloatingOptions>;
  onOpenChange?: (open: boolean) => void;
}

export type SetIDs = {
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export interface PopoverTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
  dataTestId?: string;
}

type UseInteractions = ReturnType<typeof useInteractions>;

export type UsePopover = (props: PopoverOptions) => {
  open: boolean;
  modal?: boolean;
  labelId?: string;
  descriptionId?: string;
  floatingOptions?: PopoverOptions['floatingOptions'];
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOpen: (open: boolean) => void;
} & UseInteractions &
  UseFloatingReturn;

export type ContextType = ReturnType<UsePopover> & SetIDs;
