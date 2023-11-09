import * as React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useHover,
  safePolygon,
} from '@floating-ui/react';
import { PopoverOptions, UsePopover } from '../types';

export const usePopover: UsePopover = ({
  initialOpen = false,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  floatingOptions = {},
  interactionsEnabled = 'click',
}: PopoverOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes('-'),
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
    ...floatingOptions,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const hover = useHover(context, {
    enabled: controlledOpen == null,
    handleClose: safePolygon(),
  });

  const interactionsHooks = [dismiss, role];

  switch (interactionsEnabled) {
    case 'click': {
      interactionsHooks.push(click);
      break;
    }
    case 'hover': {
      interactionsHooks.push(hover);
      break;
    }
    default: {
      interactionsHooks.push(click, hover);
    }
  }

  const interactions = useInteractions(interactionsHooks);

  const result = React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      floatingOptions,
      setLabelId,
      setDescriptionId,
    }),
    [
      open,
      setOpen,
      interactions,
      data,
      modal,
      labelId,
      descriptionId,
      floatingOptions,
    ],
  );

  return result;
};
