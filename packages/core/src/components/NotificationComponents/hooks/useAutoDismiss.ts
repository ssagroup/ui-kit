import { useEffect, useRef, useState } from 'react';

/**
 * Manages an auto-dismiss timer with hover-pause support.
 *
 * When `timeout` is `undefined` no timer is set and the item stays visible
 * until the consumer removes it manually.
 *
 * When the user hovers over the card the timer pauses and resumes from where
 * it left off when they move away — `remainingRef` tracks the elapsed time so
 * the full `timeout` is never restarted from scratch after a hover.
 *
 * @param timeout   Auto-dismiss duration in ms. `undefined` = no auto-dismiss.
 * @param onDismiss Called once when the timer fires naturally (not on manual close).
 *
 * @returns
 *   - `isPaused`        — whether the timer is currently paused (hover active).
 *                         `ToastItem` uses this to pause the CSS progress bar animation.
 *   - `handleMouseEnter` — attach to the card's `onMouseEnter`.
 *   - `handleMouseLeave` — attach to the card's `onMouseLeave`.
 *
 * @example
 * ```tsx
 * const { isPaused, handleMouseEnter, handleMouseLeave } = useAutoDismiss(
 *   timeout,
 *   () => { onRemove(id); onClose?.(); },
 * );
 * ```
 */
export const useAutoDismiss = (
  timeout: number | undefined,
  onDismiss: () => void,
) => {
  const [isPaused, setIsPaused] = useState(false);
  // Tracks remaining ms so hover-resume restarts from where it was, not from the full timeout
  const remainingRef = useRef(timeout);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!timeout || isPaused) return;

    startTimeRef.current = Date.now();
    const timer = setTimeout(onDismiss, remainingRef.current);

    return () => clearTimeout(timer);
  }, [isPaused]);

  const handleMouseEnter = () => {
    if (!timeout) return;
    const elapsed = Date.now() - startTimeRef.current;
    remainingRef.current = Math.max(
      0,
      (remainingRef.current ?? timeout) - elapsed,
    );
    setIsPaused(true);
  };

  const handleMouseLeave = () => setIsPaused(false);

  return { isPaused, handleMouseEnter, handleMouseLeave };
};
