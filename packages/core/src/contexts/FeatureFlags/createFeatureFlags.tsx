import { createContext, ReactNode, useContext, useMemo } from 'react';
import { isDevEnvironment } from '../../utils/environment';
import { FeatureFlagRegistry, FeatureFlagValues } from './types';

const warned = new Set<string>();

const warnOnce = (key: string, message: string) => {
  if (!isDevEnvironment() || warned.has(key)) return;
  warned.add(key);
  console.warn(`[ssa-ui-kit] ${message}`);
};

/**
 * Clears the once-per-flag warning cache. Only useful in tests.
 *
 * @internal
 */
export const resetFeatureFlagWarnings = (): void => {
  warned.clear();
};

/**
 * Builds a provider + hook pair over a flag registry.
 *
 * The kit calls this once with its own registry; it is a factory only so the
 * specs can run against a registry with real flags in it.
 *
 * @internal
 */
export const createFeatureFlags = <R extends FeatureFlagRegistry>(
  registry: R,
) => {
  type Name = keyof R & string;
  type Values = FeatureFlagValues<R>;

  // Holds only values someone set explicitly. Registry defaults are applied at
  // read time, so "unset" stays distinguishable from "set to the default".
  const Context = createContext<Values>({});

  const Provider = ({
    flags,
    children,
  }: {
    flags: Values;
    children?: ReactNode;
  }) => {
    const parent = useContext(Context);

    // An `undefined` value means "not set here", not "off": dropping it keeps
    // the parent's value, so `flags={{ x: props.x }}` with `props.x` unset
    // inherits instead of resetting the flag to the kit default.
    const setNames = Object.keys(flags)
      .filter((name) => flags[name as Name] !== undefined)
      .sort() as Name[];

    // `flags` is usually an inline object literal, new on every render. Keying
    // the memo on its content keeps the context value stable, so consumers do
    // not re-render whenever the app does.
    const contentKey = setNames
      .map((name) => `${name}:${flags[name]}`)
      .join('|');

    const value = useMemo(() => {
      const merged: Values = { ...parent };
      for (const name of setNames) {
        if (!(name in registry)) {
          warnOnce(
            `unknown:${name}`,
            `FeatureFlagsProvider received unknown flag \`${name}\`. ` +
              'It may have been removed after becoming the default; check the changelog and delete it.',
          );
        }
        merged[name] = flags[name];
      }
      return merged;
      // setNames and flags are captured through contentKey.
    }, [parent, contentKey]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const resolve = (explicitValues: Values, name: Name): boolean => {
    const explicit = explicitValues[name];
    const definition = registry[name];

    if (explicit !== undefined) return explicit;

    // Only reachable from untyped code, or a kit component reading a flag
    // that was deleted from the registry before its branch was.
    if (!definition) {
      warnOnce(`unread:${name}`, `Unknown feature flag \`${name}\` read.`);
      return false;
    }

    if (!definition.default) {
      warnOnce(
        `undecided:${name}`,
        `Feature flag \`${name}\` is off. It becomes the default in ${definition.defaultIn}: ` +
          `${definition.description} Opt in with <FeatureFlagsProvider flags={{ ${name}: true }}>, ` +
          `or pass \`false\` to silence this warning.` +
          (definition.issue ? ` See ${definition.issue}.` : ''),
      );
    }
    return definition.default;
  };

  const useFlag = (name: Name): boolean => resolve(useContext(Context), name);

  /*
   * Every flag, resolved. Each key is a getter, so the "becomes the default"
   * warning fires only for flags a component actually reads, not for every
   * flag in the registry whenever any component asks for the object.
   */
  const useFlags = (): Readonly<Record<Name, boolean>> => {
    const explicitValues = useContext(Context);
    return useMemo(() => {
      const flags = {} as Record<Name, boolean>;
      for (const name of Object.keys(registry) as Name[]) {
        Object.defineProperty(flags, name, {
          enumerable: true,
          get: () => resolve(explicitValues, name),
        });
      }
      return flags;
    }, [explicitValues]);
  };

  return { Context, Provider, useFlag, useFlags };
};
