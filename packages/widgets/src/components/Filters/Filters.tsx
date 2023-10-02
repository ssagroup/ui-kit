import { DropdownOption, MultipleDropdown, Wrapper } from '@ssa-ui-kit/core';
import { useOnScreen, useRefs } from '@ssa-ui-kit/hooks';
import { TableFilters } from '@components/TableFilters';
import { mockData, mockInitialState, mockItems } from './stories/mockData';
import { CheckboxData } from '@components/TableFilters/types';
import { useEffect } from 'react';

// TODO: pass setRef and call it internally to set ref locally
const MultipleDropdownObserver = ({ refs, ...rest }: any) => {
  const isIntersecting = true; //useOnScreen(currentRef);
  /*
  setRef() => use local ref for useOnScreen!!!
  ...
  {...rest} setRef={setRef}...
  */
  console.log('>>>MultipleDropdownObserver refs', refs);
  useEffect(() => {
    console.log('>>>isIntersecting', rest.key);
  }, [isIntersecting]);
  return <MultipleDropdown {...rest} />;
};

export const Filters = () => {
  const onSubmit = (checkboxData: CheckboxData) => {
    console.log('>>>onSubmit', checkboxData);
  };

  const { refsByKey, setRef } = useRefs();

  useEffect(() => {
    const refs = Object.values(refsByKey).filter(Boolean);
    console.log('>>>Refs', {
      refs,
      refsByKey,
    });
  }, [refsByKey]);

  return (
    <div
      css={{
        width: 800,
        // overflow: 'hidden',
        display: 'flex',
        justifyContent: 'right',
        flex: 'auto',
      }}>
      <Wrapper
        css={{
          justifyContent: 'end',
          width: 690,
          '& > div': {
            minWidth: 'auto',
            marginRight: 10,
          },
        }}>
        {Array.from({ length: 10 }, (_, key) => key + 1).map((value) => (
          <MultipleDropdownObserver
            key={`multiple-dropdown-${value}`}
            showPlaceholder={false}
            label={`Dropdown #${value + 1}`}
            setRef={(element: HTMLDivElement) => {
              setRef(element, `multiple-dropdown-${value}`);
            }}
            css={{
              minWidth: 'unset',
            }}
            refs={refsByKey}>
            {mockItems.map((item) => (
              <DropdownOption
                key={`${item.value}${value + 1}`}
                value={`${item.value}${value + 1}`}>
                {item.label}
              </DropdownOption>
            ))}
          </MultipleDropdownObserver>
        ))}
      </Wrapper>
      <Wrapper css={{ width: 110 }}>
        <TableFilters
          data={mockData}
          initialState={mockInitialState}
          handleSubmit={onSubmit}
        />
      </Wrapper>
    </div>
  );
};
