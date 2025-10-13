import { InfraDashInternalProvider } from '@shared/context';
import { PanelRegistry } from '@shared/panelRegistry';
import {
  MutationClient,
  mutationClient,
  QueryClient,
  queryClient,
} from '@shared/query';
import { InfraDashTransport } from '@shared/transport';

import { panelRegistry } from './panels';

export type InfraDashProviderProps = {
  transport: InfraDashTransport;
  children: React.ReactNode;
  queryClient?: QueryClient;
  mutationClient?: MutationClient;
  panelRegistry?: PanelRegistry;
};

export const InfraDashProvider = ({
  children,
  transport,
  queryClient: providedQueryClient,
  mutationClient: providedMutationClient,
  panelRegistry: providedPanelRegistry,
}: InfraDashProviderProps) => {
  return (
    <InfraDashInternalProvider
      value={{
        transport,
        queryClient: providedQueryClient ?? queryClient,
        mutationClient: providedMutationClient ?? mutationClient,
        panelRegistry: providedPanelRegistry ?? panelRegistry,
      }}>
      {children}
    </InfraDashInternalProvider>
  );
};
