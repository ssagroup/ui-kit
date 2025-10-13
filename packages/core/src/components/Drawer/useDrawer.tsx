import { useState } from 'react';

import {
  OpenChangeReason,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react';

import { useUncontrolled } from '@ssa-ui-kit/hooks';

export type Position = 'left' | 'right' | 'top' | 'bottom';

export type UseDrawerOptions = {
  opened?: boolean;
  duration?: number;
  defaultOpened?: boolean;
  dismissable?: boolean;
  position?: Position;
  title?: string;
  withCloseButton?: boolean;
  onOpenChange?: (
    open: boolean,
    event?: Event,
    reason?: OpenChangeReason,
  ) => void;
};

export const useDrawer = ({
  opened,
  duration = 200,
  defaultOpened,
  dismissable = false,
  position = 'left',
  title,
  withCloseButton = false,
  onOpenChange,
}: UseDrawerOptions = {}) => {
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange: onOpenChange,
  });
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  const toggle = (open?: boolean) => {
    const _open = open ?? !_opened;
    setOpened(_open);
  };

  const { context, refs } = useFloating({
    open: _opened,
    onOpenChange: setOpened,
  });

  const transition = useTransitionStatus(context, {
    duration,
  });

  const dismiss = useDismiss(context, {
    enabled: dismissable,
  });
  const click = useClick(context);

  const interactions = useInteractions([dismiss, click]);

  return {
    opened: _opened,
    dismissable,
    position,
    duration,
    floatingContext: context,
    interactions,
    transition,
    title,
    withCloseButton,
    portalNode,
    setFloating: refs.setFloating,
    setPortalNode,
    toggle,
  };
};

export type UseDrawerStore = ReturnType<typeof useDrawer>;
