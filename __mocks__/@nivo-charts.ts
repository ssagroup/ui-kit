import React from 'react';

// Simplified mocks for @nivo packages
// These return minimal component functions that wrapNivoResponsiveComponent can wrap

// Mock responsive components - return simple functions that wrapNivoResponsiveComponent will handle
export const ResponsivePie = () => null;
export const ResponsiveRadar = () => null;
export const ResponsiveLine = () => null;
export const ResponsiveTreeMap = () => null;

// Mock @nivo/core exports
export const DotsItem = () => null;
export const useTheme = () => ({});
export const Container = ({ children }: { children: React.ReactNode }) => children as React.ReactElement;
export const linearGradientDef = (
  id: string,
  defs: Array<{ offset: number; color: string }>,
) => ({
  id,
  type: 'linearGradient',
  defs,
});

// Mock @nivo/line exports
export const isPoint = (point: any): boolean => {
  return (
    point &&
    typeof point === 'object' &&
    'data' in point &&
    'x' in point &&
    'y' in point
  );
};
export type PointOrSliceData<T> = T;
export type LineSeries = any;
