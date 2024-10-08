import { NavigateFunction } from 'react-router-dom';

type GoBack = (navigate: NavigateFunction) => void;
export type CrumbContent = string | ((param?: unknown) => React.ReactNode);

export type PathHandle = {
  crumb: CrumbContent | { goBack: GoBack; content: CrumbContent };
  title?: string;
};
