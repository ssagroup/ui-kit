import { useContext, cloneElement } from 'react';

import { ModalContext } from '@components/Modal';

import { callAll } from '@ssa-ui-kit/utils';

function ModalOpenButton({ children: child }: { children: JSX.Element }) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

export default ModalOpenButton;
