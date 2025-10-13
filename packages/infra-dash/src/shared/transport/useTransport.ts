import { useInfraDashContext } from '../context';

import { InfraDashTransport } from './baseTransport';

export const useTransport = (transport?: InfraDashTransport) => {
  const { transport: contextTransport } = useInfraDashContext();
  return transport ?? contextTransport;
};
