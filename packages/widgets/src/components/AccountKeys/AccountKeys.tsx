import { Card } from '@ssa-ui-kit/core';

import {
  AccountKeysContent,
  AccountKeysHeader,
  AccountKeysProvider,
} from './components';
import * as S from './styles';
import {
  useAccountKeys,
  UseAccountKeysOptions,
  UseAccountKeysStore,
} from './useAccountKeys';

type OptionalIfStore<T> =
  | (T & { store?: undefined })
  | (Partial<T> & { store: UseAccountKeysStore });

export type AccountKeysProps = OptionalIfStore<UseAccountKeysOptions> & {
  children?: React.ReactNode;
};

export const AccountKeys = ({
  children,
  store: controlledStore,
  ...accountKeysProps
}: AccountKeysProps) => {
  const uncontrolledStore = useAccountKeys(
    accountKeysProps as UseAccountKeysOptions,
  );
  const store = controlledStore || uncontrolledStore;

  return (
    <AccountKeysProvider value={{ store }}>
      <Card
        noShadow
        css={S.Card}
        className={store.isDisabled ? 'disabled' : ''}>
        {children || (
          <>
            <AccountKeysHeader />
            <AccountKeysContent />
          </>
        )}
      </Card>
    </AccountKeysProvider>
  );
};

AccountKeys.Header = AccountKeysHeader;
AccountKeys.Content = AccountKeysContent;
