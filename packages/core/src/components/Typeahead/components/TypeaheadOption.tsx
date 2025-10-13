import Button from '@components/Button';
import Icon from '@components/Icon';

import * as S from '../styles';
import { TypeaheadItemProps } from '../types';

export const TypeaheadOption = ({ children, ...rest }: TypeaheadItemProps) => (
  <S.TypeaheadOption {...rest}>
    <div
      css={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
      {children}{' '}
    </div>
    {rest.isActive && (
      <Button
        variant="tertiary"
        css={{
          height: 'auto',
          padding: 0,
        }}
        startIcon={
          <Icon
            name="check"
            size={10}
            css={{ marginLeft: 'auto', minWidth: 10 }}
          />
        }
      />
    )}
  </S.TypeaheadOption>
);
