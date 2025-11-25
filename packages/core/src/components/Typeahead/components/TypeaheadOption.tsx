import Icon from '@components/Icon';
import * as S from '../styles';
import { TypeaheadItemProps } from '../types';
import Button from '@components/Button';

export const TypeaheadOption = ({
  children,
  avatar,
  ...rest
}: TypeaheadItemProps) => (
  <S.TypeaheadOption {...rest}>
    {avatar && (
      <S.TypeaheadItemAvatar data-testid="typeahead-option-avatar">
        {avatar}
      </S.TypeaheadItemAvatar>
    )}
    <div
      css={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
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
