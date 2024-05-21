import { createContext, useState, useContext } from 'react';
import { AccordionProps, AccordionGroupContextProps } from './types';

export const AccordionGroupContext = createContext<AccordionGroupContextProps>(
  {} as AccordionGroupContextProps,
);

export const useAccordionGroupContext = () => useContext(AccordionGroupContext);

const useAccordionGroup = (): AccordionGroupContextProps => {
  const [openedAccordions, setOpenedAccordions] = useState<AccordionProps[]>(
    [],
  );
  const [stayOpen, setStayOpen] = useState<boolean>(false);

  const toggleOpenedAccordion = (accordion: AccordionProps) => {
    const isOpened = !!openedAccordions.find(
      (activeAccordion) => activeAccordion.id === accordion.id,
    );
    if (stayOpen) {
      const newOpenedAccordions = isOpened
        ? openedAccordions.filter(
            (activeAccordion) => activeAccordion.id !== accordion.id,
          )
        : openedAccordions.concat([accordion]);
      setOpenedAccordions(newOpenedAccordions);
    } else {
      setOpenedAccordions(isOpened ? [] : [accordion]);
    }
  };

  return {
    openedAccordions,
    stayOpen,
    setOpenedAccordions,
    toggleOpenedAccordion,
    setStayOpen,
  };
};

export const AccordionGroupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    openedAccordions,
    stayOpen,
    setOpenedAccordions,
    toggleOpenedAccordion,
    setStayOpen,
  } = useAccordionGroup();

  return (
    <AccordionGroupContext.Provider
      value={{
        openedAccordions,
        stayOpen,
        setOpenedAccordions,
        toggleOpenedAccordion,
        setStayOpen,
      }}>
      {children}
    </AccordionGroupContext.Provider>
  );
};
