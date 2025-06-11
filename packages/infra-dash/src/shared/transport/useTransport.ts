import { InfraDashTransport } from './baseTransport';

import { useInfraDashContext } from '../context';

export const useTransport = (transport?: InfraDashTransport) => {
  const { transport: contextTransport } = useInfraDashContext();
  return transport ?? contextTransport;
};
