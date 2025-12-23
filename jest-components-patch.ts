// Patch to make wrapNivoResponsiveComponent available through @components barrel export
// This works around the isolatedModules limitation with re-exports

// Mock implementation that just returns the component as-is
export const wrapNivoResponsiveComponent = <T>(Component: T): T => Component;

// Make it available for imports from '@components'
jest.mock('@components', () => {
  const actual = jest.requireActual('@components');
  return {
    ...actual,
    wrapNivoResponsiveComponent: <T>(Component: T): T => Component,
  };
});
