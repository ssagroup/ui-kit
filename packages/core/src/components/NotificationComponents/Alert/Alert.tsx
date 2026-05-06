import { FC, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import { alertObserver } from './alertObserver';
import { AlertItem } from './AlertItem';
import { containerStyles } from './styles';
import { AlertProps, DynamicAlertParams } from './types';

interface ActiveAlert extends DynamicAlertParams {
  id: string;
}

let alertIdCounter = 0;
const generateAlertId = () => `alert-${Date.now()}-${++alertIdCounter}`;

/**
 * Alert — portal-based notification container driven by the Observer pattern.
 *
 * ## Usage pattern (two steps)
 *
 * **Step 1 — mount once** near the app root (layout, shell, etc.).
 * The component renders nothing until `showAlert` is called.
 *
 * ```tsx
 * // app-root.tsx
 * import { Alert, NotificationPositions } from '@ssa-ui-kit/core';
 *
 * <Alert position={NotificationPositions.rightTop} withShadow maxAmount={5} />
 * ```
 *
 * **Step 2 — trigger from anywhere** via `showAlert`.
 * No refs, no prop drilling, no context required.
 *
 * ```tsx
 * import { showAlert, AlertVariants } from '@ssa-ui-kit/core';
 *
 * showAlert({ variant: AlertVariants.success, title: 'Saved!' });
 *
 * showAlert({
 *   variant: AlertVariants.error,
 *   title: 'Upload failed',
 *   description: 'File exceeds 10 MB.',
 *   cancelText: 'Dismiss',
 *   onClose: () => {},           // required for the cancel button to appear
 *   submitText: 'Retry',
 *   onSubmit: () => retryFn(),   // required for the submit button to appear
 * });
 * ```
 *
 * ## Key props
 * - `position`        — one of `NotificationPositions` (default: `rightTop`)
 * - `maxAmount`       — cap on simultaneous alerts; oldest is dropped when exceeded
 * - `withShadow`      — drop shadow (default: `true`)
 * - `withBorder`      — 1 px accent-color border (default: `false`)
 * - `inheritMainColor`— close icon matches the variant accent color
 * - `containerSelector` — CSS selector for a custom portal target; falls back to `document.body`
 * - `styles`          — `AlertStyleOverrides` object for per-slot CSS customization without touching the theme
 *
 * ## Stacking order
 * - `*-top` positions  → newest alert prepended (appears at the top of the stack)
 * - `*-bottom` positions → newest alert appended (appears at the bottom of the stack)
 *
 * When `maxAmount` is set and the stack is full, the oldest alert is dropped:
 * - `*-top`:    drops from the **end** of the array (bottom of the stack)
 * - `*-bottom`: drops from the **start** of the array (top of the stack)
 *
 * @category Components
 * @subcategory Notification
 */
const Alert: FC<AlertProps> = ({
  position = NotificationPositions.rightTop,
  size = NotificationSizes.small,
  withShadow = true,
  withBorder = false,
  inheritMainColor = false,
  cancelText = 'Cancel',
  submitText = 'Submit',
  containerSelector,
  animationDuration = 300,
  maxAmount,
  styles,
}) => {
  const [alerts, setAlerts] = useState<ActiveAlert[]>([]);

  // Each Alert instance gets a unique subscription key via useId().
  // This allows multiple <Alert> components in the same document (e.g. Storybook
  // Docs view renders several stories simultaneously) to coexist without one
  // overwriting the other's observer subscription.
  const instanceId = useId();

  // useRef keeps the subscription callback stable (created once in useEffect)
  // while still reading the *current* prop values on every dispatch.
  // Without refs, the callback would close over stale values from the first render,
  // and re-subscribing on every change would risk duplicate or missed events.
  const positionRef = useRef(position);
  positionRef.current = position;

  const maxAmountRef = useRef(maxAmount);
  maxAmountRef.current = maxAmount;

  useEffect(() => {
    alertObserver.subscribe(instanceId, (params: DynamicAlertParams) => {
      const newAlert: ActiveAlert = { ...params, id: generateAlertId() };

      setAlerts((prev) => {
        const isTop = positionRef.current.includes('top');
        // top-*:    prepend so newest is at index 0 (top of the visual stack)
        // bottom-*: append  so newest is at the end   (bottom of the visual stack)
        const next = isTop ? [newAlert, ...prev] : [...prev, newAlert];

        const limit = maxAmountRef.current;
        if (limit && next.length > limit) {
          // top-*:    oldest is at the end   → keep the first  `limit` entries
          // bottom-*: oldest is at the start → keep the last   `limit` entries
          return isTop ? next.slice(0, limit) : next.slice(-limit);
        }

        return next;
      });
    });

    return () => {
      alertObserver.unsubscribe(instanceId);
    };
  }, []);

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  if (alerts.length === 0 || typeof document === 'undefined') {
    return null;
  }

  const container =
    (containerSelector && document.querySelector(containerSelector)) ||
    document.body;

  return createPortal(
    <div css={containerStyles(position)}>
      {alerts.map((alert) => (
        <AlertItem
          key={alert.id}
          size={alert.size ?? size}
          cancelText={alert.cancelText ?? cancelText}
          submitText={alert.submitText ?? submitText}
          withShadow={withShadow}
          withBorder={withBorder}
          inheritMainColor={inheritMainColor}
          animationDuration={animationDuration}
          position={position}
          styleOverrides={styles}
          id={alert.id}
          variant={alert.variant}
          title={alert.title}
          description={alert.description}
          onClose={alert.onClose}
          onSubmit={alert.onSubmit}
          onRemove={removeAlert}
        />
      ))}
    </div>,
    container,
  );
};

export default Alert;
