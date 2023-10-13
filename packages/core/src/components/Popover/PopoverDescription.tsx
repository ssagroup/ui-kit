import * as React from 'react';
import { useId } from '@floating-ui/react';
import { usePopoverContext } from './hooks/usePopoverContext';
import Typography from '@components/Typography';

export const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  Parameters<typeof Typography>[0]
>(function PopoverDescription(props, ref) {
  const { setDescriptionId } = usePopoverContext();
  const id = useId();

  // Only sets `aria-describedby` on the Popover root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return <Typography as="div" {...props} ref={ref} id={id} />;
});
