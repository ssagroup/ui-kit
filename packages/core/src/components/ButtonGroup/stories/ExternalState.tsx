import { useState } from 'react';
import { ButtonGroup } from '../ButtonGroup';
import { items } from '../helpers';
import { ButtonGroupItem } from '../types';

export const ExternalStateStory = () => {
  const [externalState, setExternalState] = useState<ButtonGroupItem>();
  const handleExternalClick = () => {
    setExternalState(items[2]);
  };
  const handleClick = (item: ButtonGroupItem) => () => {
    setExternalState(item);
  };
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: 250,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div
        css={{
          width: 250,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
        <ButtonGroup
          items={items}
          onClick={(item) => handleClick(item)()}
          externalState={externalState}
        />
      </div>
      <button
        type="button"
        onClick={handleExternalClick}
        css={{
          border: 'none',
          background: '#eef1f7',
          padding: 8,
          cursor: 'pointer',
          '&:hover': {
            background: '#fff',
          },
          '&:focus': {
            background: 'rgb(222, 225, 236)',
          },
          '&:active': {
            background: 'rgb(210, 212, 219)',
          },
        }}>
        Choose &quot;Stopped&quot; tab
      </button>
    </div>
  );
};
