import React from 'react';

export const ResponsivePie = () =>
  React.createElement('div', null, 'ResponsivePie Mock');
export const ResponsiveRadar = () =>
  React.createElement('div', null, 'ResponsiveRadar Mock');
export const ResponsiveLine = () =>
  React.createElement('div', null, 'ResponsiveLine Mock');
export const ResponsiveTreeMap = () =>
  React.createElement('div', null, 'ResponsiveTreeMap Mock');

// Mock @nivo/core exports
export const DotsItem = () => React.createElement('g', null, 'DotsItem Mock');
export const useTheme = () => ({});
export const Container = ({ children }: { children: React.ReactNode }) =>
  React.createElement('div', null, children);
