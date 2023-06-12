import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import RadioGroup from './RadioGroup';
import Radio from '@components/Radio';

describe('RadioGroup', () => {
  const radios = {
    radio1: { value: 'apple', text: 'Apple' },
    radio2: { value: 'orange', text: 'Orange' },
    radio3: { value: 'banana', text: 'Banana' },
  };

  it('Renders and reacts to clicks', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    const { getByRole } = render(
      <RadioGroup name="fruit" onChange={onChange}>
        <Radio id="radio1" value="apple" text="Apple" />
        <Radio id="radio2" value="orange" text="Orange" />
        <Radio id="radio3" value="banana" text="Banana" />
      </RadioGroup>,
    );

    const radioGroupEl = getByRole('radiogroup');
    const radioEls = within(radioGroupEl).queryAllByRole('radio');
    expect(radioEls.length).toBe(3);

    for (const radioEl of radioEls) {
      const id = radioEl.id;
      const radioProps = radios[id];

      expect(radioEl).not.toHaveAttribute('checked');
      expect(radioEl).toHaveAttribute('name', 'fruit');
      expect(radioEl).toHaveAttribute('value', radioProps.value);
      expect(radioEl).not.toHaveAttribute('disabled');
      expect(radioEl).not.toHaveAttribute('required');
    }

    for (const radioEl of radioEls) {
      await user.click(radioEl);
      const value = (radioEl as HTMLInputElement).value;
      expect(onChange).toHaveBeenCalledWith(value);

      const el = document.querySelector(
        `input[value="${value}"]`,
      ) as HTMLInputElement;
      expect(el?.checked).toBe(true);
      expect(document.querySelectorAll('input:checked').length).toBe(1);
    }
  });

  it('Renders with the initial state', () => {
    const onChange = jest.fn();

    const { getAllByRole } = render(
      <RadioGroup name="fruit" onChange={onChange} initialState="orange">
        <Radio id="radio1" value="apple" text="Apple" />
        <Radio id="radio2" value="orange" text="Orange" />
        <Radio id="radio3" value="banana" text="Banana" />
      </RadioGroup>,
    );

    const el = getAllByRole('radio')[1] as HTMLInputElement;
    expect(el?.checked).toBe(true);
    expect(document.querySelectorAll('input:checked').length).toBe(1);
  });

  it('Renders with custom styles', () => {
    const onChange = jest.fn();

    const { getByRole } = render(
      <RadioGroup
        name="fruit"
        onChange={onChange}
        initialState="orange"
        css={{ backgroundColor: 'blue' }}>
        <Radio id="radio1" value="apple" text="Apple" />
        <Radio id="radio2" value="orange" text="Orange" />
        <Radio id="radio3" value="banana" text="Banana" />
      </RadioGroup>,
    );

    const radioGroupEl = getByRole('radiogroup');
    expect(radioGroupEl).toHaveStyleRule('background-color', 'blue');
  });

  it('Renders with the "required" attribute', () => {
    const onChange = jest.fn();

    const { getAllByRole } = render(
      <RadioGroup
        name="fruit"
        onChange={onChange}
        initialState="orange"
        isRequired={true}>
        <Radio id="radio1" value="apple" text="Apple" />
        <Radio id="radio2" value="orange" text="Orange" />
        <Radio id="radio3" value="banana" text="Banana" />
      </RadioGroup>,
    );

    const radioEls = getAllByRole('radio');
    expect(radioEls.length).toBe(3);

    for (const radioEl of radioEls) {
      expect(radioEl).toBeRequired();
    }
  });
});
