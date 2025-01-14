import { createContext, useEffect, useState } from 'react';
import { ModalInformation, ModalsContextType } from './types';

export const ModalsContext = createContext<ModalsContextType>({
  isOpen: false,
  modalInfo: {} as ModalInformation,
  openModal: () => {
    /* no-op */
  },
  closeModal: () => {
    /* no-op */
  },
  setModalInfo: () => {
    /* no-op */
  },
});

export const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInformation>(
    {} as ModalInformation,
  );

  const openModal = (newModalInfo: ModalInformation) => {
    setModalInfo(newModalInfo);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setModalInfo({} as ModalInformation);
    }
  }, [isOpen]);

  return (
    <ModalsContext.Provider
      value={{
        isOpen,
        modalInfo,
        openModal,
        closeModal,
        setModalInfo,
      }}>
      {children}
    </ModalsContext.Provider>
  );
};
