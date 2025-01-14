import { useModals } from '.';
import { MODALS } from './constants';

export const Modals = () => {
  const { isOpen, modalInfo } = useModals();
  if (!isOpen) {
    return null;
  }

  const ModalComponent = MODALS[modalInfo.id];

  return <ModalComponent {...modalInfo} isOpen />;
};
