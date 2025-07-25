import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import { useCollapsibleNavBarContext } from '../CollapsibleNavBarContext';
import * as S from '../styles';

export const NavContentToggle = ({
  id,
  isChecked,
}: {
  id: string;
  isChecked: boolean;
}) => {
  const globalTheme = useTheme();
  const { theme, showIconTooltip } = useCollapsibleNavBarContext();
  return (
    <div css={S.ContentToggle(theme, isChecked)}>
      <label
        htmlFor={id}
        data-testid="collapsible-nav-content-toggle-label"
        aria-expanded={isChecked}
        css={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
        <Icon
          name={isChecked ? 'carrot-left' : 'carrot-right'}
          color={theme === 'default' ? '#000' : globalTheme.colors.greyDarker}
          size={14}
          tooltip={showIconTooltip ? undefined : ''}
        />
      </label>
    </div>
  );
};
