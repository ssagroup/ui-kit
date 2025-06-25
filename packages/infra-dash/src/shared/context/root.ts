import { createSafeContext } from '@ssa-ui-kit/hooks';

import { PanelRegistry } from '@shared/panelRegistry';
import { MutationClient, QueryClient } from '@shared/query';
import { InfraDashTransport } from '@shared/transport';

export interface InfraDashContextValue {
  transport: InfraDashTransport;
  queryClient: QueryClient;
  mutationClient: MutationClient;
  panelRegistry: PanelRegistry;
}

export const [InfraDashInternalProvider, useInfraDashContext] =
  createSafeContext<InfraDashContextValue>(
    'useInfraDashContext must be used within a InfraDashProvider',
  );
