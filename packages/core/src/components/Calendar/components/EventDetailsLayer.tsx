import { ReactNode } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useTheme } from '@emotion/react';

import { DETAILS_DISPLAY_ATTRIBUTE } from '../consts';
import * as S from '../styles';

type EventDetailsLayerProps = {
  /** The clicked entry. Only used to place the `popover`. */
  anchor: HTMLElement;
  display: 'popover' | 'modal';
  /** Accessible name of the dialog. */
  label: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Holds `renderEventDetails` content: a dialog next to the clicked entry, or
 * centred over a dimmed page. Escape and a click outside close it; focus
 * moves in and returns to the entry.
 */
export const EventDetailsLayer = ({
  anchor,
  display,
  label,
  onClose,
  children,
}: EventDetailsLayerProps) => {
  const theme = useTheme();
  const isModal = display === 'modal';

  const { refs, floatingStyles, context } = useFloating({
    open: true,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
    elements: { reference: anchor },
    placement: 'right-start',
    whileElementsMounted: isModal ? undefined : autoUpdate,
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ['left-start', 'bottom-start', 'top-start'],
        padding: 8,
      }),
      shift({ padding: 8 }),
    ],
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  const dialog = (
    <FloatingFocusManager context={context} modal={isModal}>
      <div
        ref={refs.setFloating}
        aria-label={label}
        {...{ [DETAILS_DISPLAY_ATTRIBUTE]: display }}
        css={S.detailsLayer}
        style={isModal ? undefined : floatingStyles}
        {...getFloatingProps()}>
        {children}
      </div>
    </FloatingFocusManager>
  );

  return (
    <FloatingPortal>
      {isModal ? (
        <FloatingOverlay lockScroll css={S.detailsOverlay(theme)}>
          {dialog}
        </FloatingOverlay>
      ) : (
        dialog
      )}
    </FloatingPortal>
  );
};
