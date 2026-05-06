/**
 * Module-level singleton that connects imperative `showAlert()` calls to
 * whichever `<Alert>` components are currently mounted in the document.
 *
 * Architecture overview:
 * ```
 * showAlert(params)
 *   └─► alertObserver.dispatch(params)
 *         └─► Alert.tsx subscription callback (added in useEffect, removed on unmount)
 *               └─► setAlerts(prev => [...]) — React state update → re-render → portal
 * ```
 *
 * Multiple `<Alert>` instances are supported (each subscribes under a unique
 * `useId()` key), so all mounted instances receive every dispatched event.
 * In a typical app you mount exactly one `<Alert>` near the root.
 */
import { createObserver } from '@utils/createObserver';

import { DynamicAlertParams } from './types';

export const alertObserver = createObserver<DynamicAlertParams>();

/**
 * Imperatively triggers a new alert inside the mounted `<Alert>` component.
 *
 * The `<Alert>` component must be mounted somewhere in the tree (typically near
 * the app root) to receive dispatched alerts.
 *
 * @example
 * ```ts
 * showAlert({ variant: AlertVariants.success, title: 'Saved!', description: 'Your changes have been saved.' });
 * ```
 */
export const showAlert = (params: DynamicAlertParams): void => {
  alertObserver.dispatch(params);
};
