import { useEffect } from 'react';
import { isNill } from '@ssa-ui-kit/utils';

type UseClickOutsideType = (
  ref: React.RefObject<HTMLElement | null>,
  fn: (e: Event) => void,
) => void;

export const useClickOutside: UseClickOutsideType = (ref, onClickOutside) => {
  const events = ['mousedown', 'touchstart'];

  useEffect(() => {
    const handler = (e: Event) => {
      if (
        isNill(ref.current) ||
        ref.current.contains(e.target as HTMLElement)
      ) {
        return;
      }
      onClickOutside(e);
    };

    events.forEach((eventName) =>
      document.addEventListener(eventName, handler),
    );

    return () =>
      events.forEach((eventName) =>
        document.removeEventListener(eventName, handler),
      );
  }, [ref, onClickOutside]);
};
