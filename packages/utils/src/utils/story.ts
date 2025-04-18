// Useful for generating test datasets for storybook stories
export const seededRandom = (seed: number) => {
  return () => {
    // Linear congruential generator
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
};
