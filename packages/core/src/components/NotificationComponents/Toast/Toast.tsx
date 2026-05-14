import { FC, useEffect, useEffectEvent, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import { containerStyles } from './styles';
import { toastObserver } from './toastObserver';
import { ToastItem } from './ToastItem';
import { DynamicToastParams, ToastProps, ToastVariants } from './types';

/**
 * Toast — portal-based notification container driven by the Observer pattern.
 *
 * ## Usage pattern (two steps)
 *
 * **Step 1 — mount once** near the app root:
 * ```tsx
 * import { Toast, NotificationPositions } from '@ssa-ui-kit/core';
 *
 * <Toast position={NotificationPositions.rightBottom} withShadow timeout={4000} />
 * ```
 *
 * **Step 2 — trigger from anywhere** via `showToast`:
 * ```tsx
 * import { showToast, ToastVariants } from '@ssa-ui-kit/core';
 *
 * showToast({ variant: ToastVariants.success, title: 'File saved!' });
 *
 * showToast({
 *   variant: ToastVariants.warning,
 *   title: 'Uploading…',
 *   timeout: 8000,
 *   withProgress: true,
 * });
 * ```
 *
 * ## Key props
 * - `position`         — one of `NotificationPositions` (default: `rightBottom`)
 * - `timeout`          — default auto-dismiss ms; `undefined` = no auto-dismiss (default: `4000`)
 * - `withProgress`     — show progress bar by default (default: `false`)
 * - `maxAmount`        — cap on simultaneous toasts; oldest dropped when exceeded
 * - `withShadow`       — drop shadow (default: `true`)
 * - `withBorder`       — 1 px border (default: `false`)
 * - `containerSelector`— CSS selector for a custom portal target
 *
 * ## Stacking order
 * - `*-top` positions  → newest toast prepended (top of stack)
 * - `*-bottom` positions → newest toast appended (bottom of stack)
 *
 * ## `timeout` precedence
 * Per-toast `timeout` from `showToast` overrides the component-level default.
 * `undefined` at either level disables auto-dismiss for that toast.
 *
 * @category Components
 * @subcategory Notification
 */

interface ActiveToast extends DynamicToastParams {
  id: string;
  /** Resolved timeout — may differ from component-level default */
  resolvedTimeout?: number;
  /** Resolved withProgress */
  resolvedWithProgress: boolean;
  /** Resolved progress bar color — per-toast override or component-level default */
  resolvedProgressColor?: string;
}

let toastIdCounter = 0;
const generateToastId = () => `toast-${Date.now()}-${++toastIdCounter}`;

const Toast: FC<ToastProps> = (props) => {
  const {
    position = NotificationPositions.rightBottom,
    size = NotificationSizes.small,
    withShadow = true,
    withBorder = false,
    cancelText,
    submitText,
    containerSelector,
    animationDuration = 300,
    maxAmount,
    withProgress = false,
    progressColor,
  } = props;

  // Check the raw props object so that `<Toast timeout={undefined} />` (explicitly
  // disabling auto-dismiss) is distinguished from `<Toast />` (use the 4 s default).
  // Destructuring defaults cannot make this distinction — both give `timeout = 4000`.
  const timeout = 'timeout' in props ? props.timeout : 4000;
  const [toasts, setToasts] = useState<ActiveToast[]>([]);

  // Unique per-instance key — multiple <Toast> mounts (e.g. Storybook Docs view)
  // each keep independent subscriptions without overwriting each other.
  const instanceId = useId();

  // useEffectEvent gives us a stable function reference that always reads the
  // latest prop values — no manual refs needed. The effect subscribes once and
  // never re-runs, while the handler always sees fresh position, maxAmount, etc.
  const handleDispatch = useEffectEvent((params: DynamicToastParams) => {
    const resolvedTimeout = 'timeout' in params ? params.timeout : timeout;
    const resolvedWithProgress =
      !!resolvedTimeout &&
      ('withProgress' in params ? !!params.withProgress : withProgress);

    const resolvedProgressColor = params.progressColor ?? progressColor;

    const newToast: ActiveToast = {
      ...params,
      id: generateToastId(),
      resolvedTimeout,
      resolvedWithProgress,
      resolvedProgressColor,
    };

    setToasts((prev) => {
      const isTop = position.includes('top');
      const next = isTop ? [newToast, ...prev] : [...prev, newToast];

      if (maxAmount && next.length > maxAmount) {
        return isTop ? next.slice(0, maxAmount) : next.slice(-maxAmount);
      }

      return next;
    });
  });

  useEffect(() => {
    toastObserver.subscribe(instanceId, handleDispatch);
    return () => toastObserver.unsubscribe(instanceId);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0 || typeof document === 'undefined') {
    return null;
  }

  const container =
    (containerSelector && document.querySelector(containerSelector)) ||
    document.body;

  return createPortal(
    <div css={containerStyles(position)}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          {...toast}
          variant={toast.variant ?? ToastVariants.secondary}
          size={toast.size ?? size}
          cancelText={toast.cancelText ?? cancelText}
          submitText={toast.submitText ?? submitText}
          withShadow={withShadow}
          withBorder={withBorder}
          animationDuration={animationDuration}
          position={position}
          timeout={toast.resolvedTimeout}
          withProgress={toast.resolvedWithProgress}
          progressColor={toast.resolvedProgressColor}
          onRemove={removeToast}
        />
      ))}
    </div>,
    container,
  );
};

export default Toast;
