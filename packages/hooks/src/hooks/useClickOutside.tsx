import { useEffect } from 'react';

type UseClickOutsideType = (
  ref: React.RefObject<HTMLElement>,
  fn: (e: React.MouseEvent<HTMLElement>) => void,
) => void;

export const useClickOutside: UseClickOutsideType = (ref, onClickOutside) => {
  const events = ['mousedown', 'touchstart'];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current == null || ref.current.contains(e.target)) {
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
