import { StrictRJSFSchema, UiSchema } from '@rjsf/utils';

export const getFieldsToHide = (
  schema: StrictRJSFSchema,
  searchQuery: string,
): string[] => {
  const term = searchQuery.toLowerCase();
  const result: string[] = [];

  const matches = (s: StrictRJSFSchema) =>
    s.title?.toLowerCase().includes(term) ?? false;

  function walk(
    s: StrictRJSFSchema,
    path: string[],
    parentMatched: boolean,
  ): boolean {
    const selfMatches = matches(s);
    const effectiveMatch = selfMatches || parentMatched;

    let hasMatchingDescendant = false;

    if (s.type === 'object' && s.properties) {
      for (const [key, child] of Object.entries(s.properties)) {
        const childMatched = walk(
          child as StrictRJSFSchema,
          [...path, key],
          effectiveMatch,
        );
        if (childMatched) hasMatchingDescendant = true;
      }
    }

    const fullPath = path.join('.');
    const thisHasMatch = selfMatches || hasMatchingDescendant;

    if (!thisHasMatch && path.length > 0 && !parentMatched) {
      result.push(fullPath);
    }

    return thisHasMatch;
  }

  walk(schema, [], false);
  return result;
};

export const applyHiddenWidget = (
  uiSchema: UiSchema,
  pathsToHide: string[],
): UiSchema => {
  const updated = structuredClone(uiSchema);

  for (const path of pathsToHide) {
    const keys = path.split('.');
    let node = updated;

    for (const [i, key] of keys.entries()) {
      node[key] = node[key] ?? {};
      if (i === keys.length - 1) {
        node[key]['ui:widget'] = 'hidden';
      } else {
        node = node[key];
      }
    }
  }

  return updated;
};
