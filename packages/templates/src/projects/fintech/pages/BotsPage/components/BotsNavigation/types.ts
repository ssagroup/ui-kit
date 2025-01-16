import { ButtonGroupItem } from '@ssa-ui-kit/core';

export type BotsNavigationProps = {
  handleRunStateClick: (item: ButtonGroupItem) => void;
  externalState?: ButtonGroupItem;
};
