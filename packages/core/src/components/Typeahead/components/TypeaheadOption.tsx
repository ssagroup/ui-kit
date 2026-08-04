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

  // `disabled` is the supported spelling, but the styled <li> below would
  // forward it to the DOM, where it is not valid on an <li>. useTypeahead has
  // already resolved it into `isDisabled`, which emotion filters out.
  const optionProps = { ...rest };
  delete optionProps.disabled;

  return (
    <S.TypeaheadOption {...optionProps}>
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
