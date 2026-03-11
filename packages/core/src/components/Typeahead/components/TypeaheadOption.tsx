import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import * as S from '../styles';
import { TypeaheadItemProps } from '../types';
import Button from '@components/Button';

export const TypeaheadOption = ({
  children,
  avatar,
  isCustomValue,
  ...rest
}: TypeaheadItemProps) => {
  const theme = useTheme();
  return (
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
          color: isCustomValue ? theme.palette.primary.main : 'inherit',
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
};
