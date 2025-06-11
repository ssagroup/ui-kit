import { InfraDashInternalProvider } from '@shared/context';
import {
  mutationClient,
  MutationClient,
  queryClient,
  QueryClient,
} from '@shared/query';
import { InfraDashTransport } from '@shared/transport';

export type InfraDashProviderProps = {
  transport: InfraDashTransport;
  children: React.ReactNode;
  queryClient?: QueryClient;
  mutationClient?: MutationClient;
};

export const InfraDashProvider = ({
  children,
  transport,
  queryClient: providedQueryClient,
  mutationClient: providedMutationClient,
}: InfraDashProviderProps) => {
  return (
    <InfraDashInternalProvider
      value={{
        transport,
        queryClient: providedQueryClient ?? queryClient,
        mutationClient: providedMutationClient ?? mutationClient,
      }}>
      {children}
    </InfraDashInternalProvider>
  );
};
