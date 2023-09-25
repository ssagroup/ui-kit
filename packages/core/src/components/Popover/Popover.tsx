import * as React from 'react';
import { PopoverOptions } from './types';
import { usePopover } from './hooks/usePopover';
import { PopoverContext } from './hooks/usePopoverContext';

export const Popover = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: React.ReactNode;
} & PopoverOptions) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const popover = usePopover({ modal, ...restOptions });
  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};
