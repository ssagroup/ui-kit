import { Icon } from '@ssa-ui-kit/core';
import * as S from './styles';
import { useState } from 'react';

export const NavContentToggle = ({ id }: { id: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div css={S.ContentToggle}>
      <input type="checkbox" id={id} onChange={() => setChecked(!checked)} />
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
        <Icon name={checked ? 'carrot-left' : 'carrot-right'} size={14} />
      </label>
    </div>
  );
};
