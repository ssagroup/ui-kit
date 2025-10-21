import { FloatingFocusManager } from '@floating-ui/react';

import { usePopoverContext } from '@components/Popover';

export const TypeaheadFocusTrap = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { context, modal } = usePopoverContext();
  return (
    <FloatingFocusManager context={context} modal={modal} order={['reference']}>
      {children}
    </FloatingFocusManager>
  );
};
