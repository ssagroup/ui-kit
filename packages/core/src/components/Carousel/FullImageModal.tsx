import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import * as S from './styles';

type FullImageModalProps = {
  src: string;
  alt?: string;
  onClose: () => void;
};

/**
 * The full-size image over a dimmed page, at its natural size but never more
 * than 80% of the viewport. Escape, a click outside and the close button
 * close it; focus moves in and returns to the open button.
 */
export const FullImageModal = ({ src, alt, onClose }: FullImageModalProps) => {
  const theme = useTheme();
  const { refs, context } = useFloating({
    open: true,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  return (
    <FloatingPortal>
      <FloatingOverlay lockScroll css={S.fullOverlay}>
        <FloatingFocusManager context={context} modal>
          <div
            ref={refs.setFloating}
            aria-label={alt || 'Full size image'}
            css={S.fullDialog}
            {...getFloatingProps()}>
            <img src={src} alt={alt ?? ''} css={S.fullImage} />
            <button
              type="button"
              aria-label="Close full size image"
              css={[S.squareButton, S.fullClose]}
              onClick={onClose}>
              <Icon name="cross" size={16} color={theme.colors.greyDarker80} />
            </button>
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};
