import { createContext, useContext, createElement } from 'react';

export function createSafeContext<ContextValue>(errorMessage: string) {
  const Context = createContext<ContextValue | null>(null);

  const useSafeContext = () => {
    const ctx = useContext(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };

  const Provider = ({
    children,
    value,
  }: {
    value: ContextValue;
    children: React.ReactNode;
  }) => {
    return createElement(
      Context.Provider,
      {
        value,
      },
      children,
    );
  };

  return [Provider, useSafeContext] as const;
}
