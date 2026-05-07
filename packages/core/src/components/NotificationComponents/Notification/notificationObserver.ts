/**
 * Module-level singleton connecting imperative `showNotification()` calls to
 * whichever `<Notification>` components are currently mounted in the document.
 *
 * Architecture:
 *
 *   showNotification(params)
 *     └─▶ notificationObserver.dispatch(params)
 *           └─▶ forEach subscriber (one per mounted <Notification>):
 *                 subscriber(params)   ← registered in useEffect on mount
 *                   └─▶ setNotifications(prev => [...prev, newItem])
 *                         └─▶ React re-renders → NotificationItem appears in portal
 *
 * Multiple `<Notification>` instances can coexist (e.g. Storybook Docs view).
 * Each subscribes under a unique `useId()` key so dispatches reach all of them.
 */

import { createObserver } from '@utils/createObserver';

import { DynamicNotificationParams } from './types';

export const notificationObserver = createObserver<DynamicNotificationParams>();

export const showNotification = (params: DynamicNotificationParams): void => {
  notificationObserver.dispatch(params);
};
