import { FC, useEffect, useEffectEvent, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import { containerStyles } from './styles';
import { notificationObserver } from './notificationObserver';
import { NotificationItem } from './NotificationItem';
import {
  DynamicNotificationParams,
  NotificationProps,
  NotificationVariants,
} from './types';

/**
 * Notification — portal-based notification container driven by the Observer pattern.
 *
 * ## Usage pattern (two steps)
 *
 * **Step 1 — mount once** near the app root:
 * ```tsx
 * import { Notification, NotificationPositions } from '@ssa-ui-kit/core';
 *
 * <Notification position={NotificationPositions.rightBottom} withShadow />
 * ```
 *
 * **Step 2 — trigger from anywhere** via `showNotification`:
 * ```tsx
 * import { showNotification, NotificationVariants } from '@ssa-ui-kit/core';
 *
 * showNotification({
 *   variant: NotificationVariants.neutral,
 *   title: 'Jane Smith',
 *   date: '5 minutes ago',
 *   description: 'Left a comment on your post.',
 *   icon: <img src={avatarUrl} alt="Jane" />,
 * });
 * ```
 *
 * ## Key props
 * - `position`          — one of `NotificationPositions` (default: `rightBottom`)
 * - `timeout`           — default auto-dismiss ms; omitted = persistent (default: `undefined`)
 * - `maxAmount`         — cap on simultaneous notifications; oldest dropped when exceeded
 * - `withShadow`        — drop shadow (default: `true`)
 * - `withBorder`        — 1 px border (default: `false`)
 * - `styles`            — `NotificationStyleOverrides` for per-slot CSS customization
 * - `containerSelector` — CSS selector for a custom portal target
 *
 * ## Stacking order
 * - `*-top` positions    → newest prepended (top of stack)
 * - `*-bottom` positions → newest appended (bottom of stack)
 *
 * ## `timeout` precedence
 * Per-notification `timeout` from `showNotification` overrides the component-level default.
 * `undefined` at either level keeps the notification persistent.
 *
 * @category Components
 * @subcategory Notification
 */

interface ActiveNotification extends DynamicNotificationParams {
  id: string;
  resolvedTimeout?: number;
}

let notificationIdCounter = 0;
const generateNotificationId = () =>
  `notification-${Date.now()}-${++notificationIdCounter}`;

const Notification: FC<NotificationProps> = (props) => {
  const {
    position = NotificationPositions.rightBottom,
    size = NotificationSizes.small,
    withShadow = true,
    withBorder = false,
    cancelText = '',
    submitText = '',
    containerSelector,
    animationDuration = 300,
    maxAmount,
    styles,
  } = props;

  // Notifications are persistent by default — `timeout` has no default value.
  // We use the `'timeout' in props` check so that passing `timeout={undefined}`
  // explicitly is respected as "disable auto-dismiss" and not silently ignored.
  const timeout = 'timeout' in props ? props.timeout : undefined;

  const [notifications, setNotifications] = useState<ActiveNotification[]>([]);

  // Unique per-instance key so multiple <Notification> mounts coexist without
  // overwriting each other's observer subscription (e.g. Storybook Docs view).
  const instanceId = useId();

  // useEffectEvent gives a stable reference that always reads the latest props —
  // no manual refs needed. The effect subscribes once and never re-runs.
  const handleDispatch = useEffectEvent((params: DynamicNotificationParams) => {
    // Per-notification `timeout` overrides the component-level default.
    const resolvedTimeout = 'timeout' in params ? params.timeout : timeout;

    const newNotification: ActiveNotification = {
      ...params,
      id: generateNotificationId(),
      resolvedTimeout,
    };

    setNotifications((prev) => {
      const isTop = position.includes('top');
      const next = isTop
        ? [newNotification, ...prev]
        : [...prev, newNotification];

      if (maxAmount && next.length > maxAmount) {
        return isTop ? next.slice(0, maxAmount) : next.slice(-maxAmount);
      }

      return next;
    });
  });

  useEffect(() => {
    notificationObserver.subscribe(instanceId, handleDispatch);
    return () => notificationObserver.unsubscribe(instanceId);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0 || typeof document === 'undefined') {
    return null;
  }

  const container =
    (containerSelector && document.querySelector(containerSelector)) ||
    document.body;

  return createPortal(
    <div css={containerStyles(position)}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          variant={notification.variant ?? NotificationVariants.default}
          color={notification.color}
          date={notification.date}
          icon={notification.icon}
          title={notification.title}
          description={notification.description}
          size={notification.size ?? size}
          cancelText={notification.cancelText ?? cancelText}
          submitText={notification.submitText ?? submitText}
          withShadow={withShadow}
          withBorder={withBorder}
          animationDuration={animationDuration}
          position={position}
          timeout={notification.resolvedTimeout}
          onClose={notification.onClose}
          onSubmit={notification.onSubmit}
          onRemove={removeNotification}
          styleOverrides={styles}
        />
      ))}
    </div>,
    container,
  );
};

export default Notification;
