import '@emotion/react';
import { Theme as T } from '@ssa-ui-kit/core';

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface Theme extends T {}
}
export * from './widgets/DashboardViewer';
export * from './widgets/DashboardEditor';
export * from './entities/dashboard';
export * from './shared/transport';
export * from './components/PeriodSelector';
export {
  useInfraDashContext,
  useInfraDashPanelDataPeriodContext,
} from './shared/context';
export { useQueryClient, useMutationClient } from './shared/query';

export * from './provider';
