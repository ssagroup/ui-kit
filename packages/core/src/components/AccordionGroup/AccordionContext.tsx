import { createContext, useState, useContext } from 'react';
import { AccordionProps, IAccordionGroupContext } from './types';

export const AccordionGroupContext = createContext<IAccordionGroupContext>(
  {} as IAccordionGroupContext,
);

export const useAccordionGroupContext = () => useContext(AccordionGroupContext);

const useAccordionGroup = (
  initialAccordions: Array<AccordionProps>,
): IAccordionGroupContext => {
  const [openedAccordions, setOpenedAccordions] = useState<AccordionProps[]>(
    initialAccordions || [],
  );

  const toggleOpenedAccordion = (accordion: AccordionProps) => {
    const isOpened = !!openedAccordions.find(
      (activeAccordion) => activeAccordion.id === accordion.id,
    );
    const newOpenedAccordions = isOpened
      ? openedAccordions.filter(
          (activeAccordion) => activeAccordion.id !== accordion.id,
        )
      : openedAccordions.concat([accordion]);
    setOpenedAccordions(newOpenedAccordions);
  };

  return {
    openedAccordions,
    setOpenedAccordions,
    toggleOpenedAccordion,
  };
};

export const AccordionGroupContextProvider = ({
  initialAccordions = [],
  children,
}: {
  initialAccordions?: AccordionProps[];
  children: React.ReactNode;
}) => {
  const { openedAccordions, setOpenedAccordions, toggleOpenedAccordion } =
    useAccordionGroup(initialAccordions);

  return (
    <AccordionGroupContext.Provider
      value={{
        openedAccordions,
        setOpenedAccordions,
        toggleOpenedAccordion,
      }}>
      {children}
    </AccordionGroupContext.Provider>
  );
};
