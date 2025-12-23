// Global setup to patch wrapNivoResponsiveComponent
const wrapNivoResponsiveComponent = <T>(Component: T): T => Component;

// Make it globally available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).wrapNivoResponsiveComponent = wrapNivoResponsiveComponent;

export default () => {
  return Promise.resolve();
};
