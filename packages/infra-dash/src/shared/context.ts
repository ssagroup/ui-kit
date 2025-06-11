import { createSafeContext } from '@ssa-ui-kit/hooks';

import { InfraDashTransport } from './transport';
import { MutationClient, QueryClient } from './query';

export interface InfraDashContextValue {
  transport: InfraDashTransport;
  queryClient: QueryClient;
  mutationClient: MutationClient;
}

export const [InfraDashInternalProvider, useInfraDashContext] =
  createSafeContext<InfraDashContextValue>(
    'useInfraDashContext must be used within a InfraDashProvider',
  );
