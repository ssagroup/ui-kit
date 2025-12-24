// Patch to make wrapNivoResponsiveComponent available through @components barrel export
// This works around Jest's isolatedModules limitation with re-exports
//
// The proper fix would be to ensure Jest handles re-exports correctly, but this is a simpler
// workaround that just adds the missing export to the mock without trying to preserve everything.

// Simple mock implementation that returns the component as-is (for tests)
export const wrapNivoResponsiveComponent = <T>(Component: T): T => Component;

// Mock @components to include wrapNivoResponsiveComponent
// We use jest.requireActual to preserve all existing exports
jest.mock('@components', () => {
  const actualModule = jest.requireActual('@components');

  // If wrapNivoResponsiveComponent is already exported, we're done
  if (actualModule.wrapNivoResponsiveComponent) {
    return actualModule;
  }

  // Otherwise, add it to the exports
  // Try to add it directly to the module if it's extensible
  try {
    Object.defineProperty(actualModule, 'wrapNivoResponsiveComponent', {
      value: wrapNivoResponsiveComponent,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    return actualModule;
  } catch {
    // If we can't modify the module, create a new object with all exports plus our wrapper
    return {
      ...actualModule,
      wrapNivoResponsiveComponent,
    };
  }
});
