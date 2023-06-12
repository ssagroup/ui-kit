import { useContext, cloneElement } from 'react';

import { callAll } from '@ssa-ui-kit/utils';

import { ModalContext } from '../Modal/Modal.context';

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

export default ModalDismissButton;
