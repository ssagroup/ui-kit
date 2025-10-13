import React from 'react';

import { WidgetCardProps } from './types';
import { WidgetCard } from './WidgetCard';

// `Has<T, U>` = `true` if every string in `U` also appears in `T`.
type Has<T extends string, U extends string> =
  Exclude<U, T> extends never ? true : false;

type MustIncludeHeader<T extends readonly string[]> =
  Has<T[number], 'header'> extends true ? T : never;

export type WithWidgetCardProps<F extends string[]> = {
  children: React.ReactNode;
  features?: MustIncludeHeader<F>;
  cardProps?: WidgetCardProps;
};

export function WithWidgetCard<F extends string[]>({
  children,
  features = [] as unknown as MustIncludeHeader<F>,
  cardProps = {},
}: WithWidgetCardProps<F>) {
  return features && features.includes('header') ? (
    <WidgetCard {...cardProps}>{children}</WidgetCard>
  ) : (
    <>{children}</>
  );
}
