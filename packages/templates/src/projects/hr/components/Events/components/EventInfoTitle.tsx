import { useEffect, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import {
  ButtonGroup,
  ButtonGroupItem,
  Dropdown,
  DropdownOption,
  DropdownOptionProps,
  Wrapper,
  useTranslation,
} from '@ssa-ui-kit/core';
import { prop } from '@ssa-ui-kit/utils';
import { useMinLGMediaQuery } from '@ssa-ui-kit/hooks';
import { ITEMS } from '../constants';

const isButtonGroupItem = (
  item: ButtonGroupItem | DropdownOptionProps,
): item is ButtonGroupItem => {
  return 'text' in item;
};

export const EventInfoTitle = ({
  title,
  handlePeriodChange,
}: {
  title: string;
  handlePeriodChange: (item: ButtonGroupItem) => void;
}) => {
  const DEFAULT_ITEM = ITEMS[0];
  const { t } = useTranslation();
  const isMinLGMediaQuery = useMinLGMediaQuery();
  const [selectedButtonGroupItem, setSelectedButtonGroupItem] =
    useState<ButtonGroupItem>(DEFAULT_ITEM);
  const [selectedOption, setSelectedOption] = useState<DropdownOptionProps>({
    id: DEFAULT_ITEM.id,
    value: DEFAULT_ITEM.text,
  });
  const handleEventTypeChange = (
    item: DropdownOptionProps | ButtonGroupItem,
  ) => {
    if (isButtonGroupItem(item)) {
      setSelectedButtonGroupItem(item);
      setSelectedOption({
        id: item.id,
        value: item.text,
      });
    } else {
      setSelectedOption(item);
      const newValue = prop('value')(item);
      const foundItem = ITEMS.find(
        (item) => item.text === newValue,
      ) as ButtonGroupItem;
      setSelectedButtonGroupItem(foundItem);
    }
  };

  useEffect(() => {
    handlePeriodChange(selectedButtonGroupItem);
  }, [selectedButtonGroupItem]);

  return (
    <>
      <span>{t(title)}</span>
      <Wrapper css={{ justifyContent: 'right' }}>
        {isMinLGMediaQuery ? (
          <ButtonGroup
            items={ITEMS}
            onClick={handleEventTypeChange}
            selectedItem={selectedButtonGroupItem}
            buttonStyles={
              {
                height: 40,
                '&.active': {
                  '& p': {
                    fontWeight: 800,
                  },
                },
              } as unknown as SerializedStyles
            }
          />
        ) : (
          <Dropdown
            onChange={handleEventTypeChange}
            selectedItem={selectedOption}
            css={{
              width: 130,
              justifyContent: 'space-between',
            }}>
            {ITEMS.map((item) => (
              <DropdownOption
                key={item.id}
                value={item.text}
                css={{
                  '& button': {
                    height: '100%',
                  },
                }}
              />
            ))}
          </Dropdown>
        )}
      </Wrapper>
    </>
  );
};
