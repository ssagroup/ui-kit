import { cloneElement, useContext } from 'react';

import { callAll } from '@ssa-ui-kit/utils';

import { ModalContext } from '@components/Modal';

function ModalOpenButton({ children: child }: { children: JSX.Element }) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

export default ModalOpenButton;
