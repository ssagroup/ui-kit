import { FeatureFlag, featureFlagRegistry } from './FeatureFlagsContext';

describe('FeatureFlag', () => {
  it('maps every registry flag to its own name', () => {
    expect(Object.keys(FeatureFlag)).toEqual(Object.keys(featureFlagRegistry));
    for (const [key, value] of Object.entries(FeatureFlag)) {
      expect(value).toBe(key);
    }
  });

  it('is frozen', () => {
    expect(Object.isFrozen(FeatureFlag)).toBe(true);
  });

  it('ships every flag switched off until its default major', () => {
    for (const definition of Object.values(featureFlagRegistry)) {
      expect(definition.default).toBe(false);
    }
  });
});
