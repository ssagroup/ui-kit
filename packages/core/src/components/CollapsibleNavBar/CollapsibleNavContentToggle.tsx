import Icon from '@components/Icon';
import * as S from './styles';

export const NavContentToggle = ({
  id,
  isChecked,
}: {
  id: string;
  isChecked: boolean;
}) => {
  return (
    <div css={S.ContentToggle}>
      <label
        htmlFor={id}
        css={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
        <Icon name={isChecked ? 'carrot-left' : 'carrot-right'} size={14} />
      </label>
    </div>
  );
};
