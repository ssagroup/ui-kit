import { Placement } from '@floating-ui/react';

export interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type SetIDs = {
  setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}
