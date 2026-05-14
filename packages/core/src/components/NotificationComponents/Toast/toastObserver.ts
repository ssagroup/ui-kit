/**
 * Module-level singleton connecting `showToast()` calls to mounted `<Toast>`
 * components.
 *
 * Architecture:
 * ```
 * showToast(params)
 *   └─► toastObserver.dispatch(params)
 *         └─► Toast.tsx subscription callback (added in useEffect, removed on unmount)
 *               └─► setToasts(prev => [...]) → React state update → portal
 * ```
 *
 * Multiple `<Toast>` instances are supported (each subscribes under a unique
 * `useId()` key). In a typical app you mount exactly one `<Toast>` near the root.
 */
import { createObserver } from '@utils/createObserver';

import { DynamicToastParams } from './types';

export const toastObserver = createObserver<DynamicToastParams>();

/**
 * Imperatively triggers a new toast inside every mounted `<Toast>` component.
 *
 * The `<Toast>` component must be mounted somewhere in the tree (typically near
 * the app root) for dispatched toasts to be displayed.
 *
 * @example
 * ```ts
 * import { showToast, ToastVariants } from '@ssa-ui-kit/core';
 *
 * // Simple
 * showToast({ variant: ToastVariants.secondary, title: 'File saved' });
 *
 * // Semantic variant with progress bar
 * showToast({ variant: ToastVariants.success, title: 'Uploading…', withProgress: true });
 *
 * // Fully custom content (outer card + progress bar still render)
 * showToast({
 *   variant: ToastVariants.secondary,
 *   renderProp: (close) => <MyCard onDismiss={close} />,
 * });
 * ```
 */
export const showToast = (params: DynamicToastParams): void => {
  toastObserver.dispatch(params);
};
