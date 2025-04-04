export const scaleFromBase = (
  baseValue: number,
  base: number,
  current: number,
) => {
  return (current / base) * baseValue;
};

export const normalizeToRange = (
  value: number,
  min: number,
  max: number,
  targetMin = 0,
  targetMax = 100,
): number => {
  if (max === min) return targetMin;
  const clampedValue = Math.min(Math.max(value, min), max);
  const ratio = (clampedValue - min) / (max - min);
  return ratio * (targetMax - targetMin) + targetMin;
};

export const calculateFittedSize = (
  container: { width: number; height: number },
  aspectRatio: number,
) => {
  const containerRatio = container.width / container.height;

  if (containerRatio < aspectRatio) {
    // container is too tall → constrain by width
    const width = container.width;
    return {
      width,
      height: width / aspectRatio,
    };
  } else {
    // container is too wide → constrain by height
    const height = container.height;
    return {
      width: height * aspectRatio,
      height,
    };
  }
};

export const centeredOffset = (
  container: { width: number; height: number },
  content: { width: number; height: number },
) => {
  return {
    x: (container.width - content.width) / 2,
    y: (container.height - content.height) / 2,
  };
};
