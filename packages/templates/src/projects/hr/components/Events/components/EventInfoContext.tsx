import {
  createContext,
  RefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { EventItemInfo } from '@/hr/types';
import { DEFAULT_DATE_FORMAT } from '@hr/utils';
import { getDateColumnWidth } from '../utils';

export type EventInfoContextType = {
  firstEventCellRef: RefObject<HTMLTableCellElement | null>;
  photoCellRef: RefObject<HTMLTableCellElement | null>;
  popoverOffsetLeft: number;
  dateColumnWidth: number;
  items: EventItemInfo[];
  outputDateFormat?: string;
  suffixNeeded?: boolean;
};

export const EventInfoContext = createContext<EventInfoContextType>({
  firstEventCellRef: {
    current: null,
  },
  photoCellRef: {
    current: null,
  },
  items: [],
  suffixNeeded: true,
  outputDateFormat: DEFAULT_DATE_FORMAT,
  popoverOffsetLeft: 0,
  dateColumnWidth: 65,
});

export const EventInfoProvider = ({
  children,
  items,
  outputDateFormat = DEFAULT_DATE_FORMAT,
  suffixNeeded = true,
}: { children: ReactNode } & Pick<
  EventInfoContextType,
  'items' | 'outputDateFormat' | 'suffixNeeded'
>) => {
  const firstEventCellRef = useRef<HTMLTableCellElement>(null);
  const photoCellRef = useRef<HTMLTableCellElement>(null);
  const [popoverOffsetLeft, setPopoverOffsetLeft] = useState(0);
  const [dateColumnWidth, setDateColumnWidth] = useState(65);

  const handleResize = () => {
    const newDateColumnWidth = getDateColumnWidth({
      photoCell: photoCellRef.current,
      dateCell: firstEventCellRef.current,
    });
    setDateColumnWidth(newDateColumnWidth);
    setPopoverOffsetLeft((firstEventCellRef.current?.offsetLeft || 0) - 12);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  useEffect(() => {
    setPopoverOffsetLeft((firstEventCellRef.current?.offsetLeft || 0) - 12);
  }, [firstEventCellRef.current]);

  useEffect(() => {
    const newWidth = getDateColumnWidth({
      photoCell: photoCellRef.current,
      dateCell: firstEventCellRef.current,
    });
    setDateColumnWidth(newWidth);
  }, [firstEventCellRef, photoCellRef, items]);

  return (
    <EventInfoContext.Provider
      value={{
        firstEventCellRef,
        photoCellRef,
        dateColumnWidth,
        popoverOffsetLeft,
        outputDateFormat,
        suffixNeeded,
        items,
      }}>
      {children}
    </EventInfoContext.Provider>
  );
};

export const useEventInfoContext = () => useContext(EventInfoContext);
