import React from 'react';

import { LoadingPanel } from '@components/LoadingPanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { Panel, PanelData } from '@shared/panel';

import { usePanelData } from './usePanelData';

type WithPanelDataOptions = {
  LoadingComponent?: React.ComponentType<{ title: string }>;
  ErrorComponent?: React.ComponentType<{ title: string }>;
};

type InnerProps<D> = {
  panel: Panel;
  title?: string;
  panelData: D;
};

export function withPanelData<D extends PanelData>(
  Wrapped: React.ComponentType<InnerProps<D>>,
  { LoadingComponent, ErrorComponent }: WithPanelDataOptions = {},
): React.FC<Omit<InnerProps<D>, 'panelData'>> {
  type HocProps = Omit<InnerProps<D>, 'panelData'>;

  const Enhanced: React.FC<HocProps> = ({
    panel,
    title: providedTitle,
    ...rest
  }) => {
    const title = providedTitle ?? panel.title;
    const query = usePanelData(panel);

    if (!query.isLoaded) {
      return LoadingComponent ? (
        <LoadingComponent title={title} />
      ) : (
        <LoadingPanel title={title} />
      );
    }
    if (query.error) {
      return ErrorComponent ? (
        <ErrorComponent title={title} />
      ) : (
        <ErrorPanel title={title} />
      );
    }

    const injectedProps: InnerProps<D> = {
      ...rest,
      panel,
      title,
      panelData: query.data as D,
    };

    return <Wrapped {...injectedProps} />;
  };

  return Enhanced;
}
