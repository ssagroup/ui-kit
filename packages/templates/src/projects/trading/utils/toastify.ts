import {
  ToastContent,
  ToastOptions,
  ToastPromiseParams,
  toast,
} from 'react-toastify';

export const showToast = <T>(
  endpoint: Promise<T>,
  error?: ToastPromiseParams<T>,
  statuses?: ToastPromiseParams<T>,
) => {
  return toast.promise(
    endpoint,
    {
      ...statuses,
      ...error,
    },
    {
      className: (context) => `custom-toast ${context?.type}`,
      closeOnClick: true,
      closeButton: true,
    },
  );
};

export const showSimpleToast = <T>(
  content: ToastContent,
  options?: ToastOptions<T>,
) => {
  return toast(content, {
    className: (context) => `custom-toast ${context?.type}`,
    closeOnClick: true,
    closeButton: true,
    ...options,
  });
};
