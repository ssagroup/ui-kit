import { within } from '@testing-library/dom';

import Radio from './Radio';

describe('Radio', () => {
  it('Renders in the checked state', async () => {
    const idAttr = 'apple-radio';
    const nameAttr = 'fruit';
    const valueAttr = 'apple';
    const isChecked = true;
    const text = 'Apple';

    const { getByText } = render(
      <Radio
        id={idAttr}
        name={nameAttr}
        value={valueAttr}
        isChecked={isChecked}
        text={text}
      />,
    );

    const labelEl = getByText(text).closest(
      'label',
    ) as never as HTMLLabelElement;
    const radioEl = within(labelEl).getByRole('radio');

    expect(radioEl).toHaveAttribute('checked');
    expect(radioEl).toHaveAttribute('id', idAttr);
    expect(radioEl).toHaveAttribute('name', nameAttr);
    expect(radioEl).toHaveAttribute('value', valueAttr);
    expect(radioEl).not.toHaveAttribute('disabled');
    expect(radioEl).not.toHaveAttribute('required');

    await within(labelEl).findByTitle('Radio on');
  });
  it('Renders with default values', () => {
    const valueAttr = 'apple';
    const isChecked = true;
    const text = 'Apple';

    const { getByText } = render(
      <Radio value={valueAttr} isChecked={isChecked} text={text} />,
    );

    const labelEl = getByText(text).closest(
      'label',
    ) as never as HTMLLabelElement;
    const radioEl = within(labelEl).getByRole('radio');

    expect(radioEl).toHaveAttribute('checked');
    expect(radioEl).toHaveAttribute('id');
    expect(radioEl).toHaveAttribute('name');
    expect(radioEl).toHaveAttribute('value', valueAttr);
    expect(radioEl).not.toHaveAttribute('disabled');
    expect(radioEl).not.toHaveAttribute('required');

    within(labelEl).getByTitle('Radio on');
  });

  it('Renders in the un-checked state', async () => {
    const idAttr = 'apple-radio';
    const nameAttr = 'fruit';
    const valueAttr = 'apple';
    const isChecked = false;
    const text = 'Apple';

    const { getByText } = render(
      <Radio
        id={idAttr}
        name={nameAttr}
        value={valueAttr}
        isChecked={isChecked}
        text={text}
      />,
    );

    const labelEl = getByText(text).closest(
      'label',
    ) as never as HTMLLabelElement;
    const radioEl = within(labelEl).getByRole('radio');

    expect(radioEl).not.toHaveAttribute('checked');
    expect(radioEl).toHaveAttribute('id', idAttr);
    expect(radioEl).toHaveAttribute('name', nameAttr);
    expect(radioEl).toHaveAttribute('value', valueAttr);
    expect(radioEl).not.toHaveAttribute('disabled');
    expect(radioEl).not.toHaveAttribute('required');

    await within(labelEl).findByTitle('Circle');
  });

  it('Renders in the disabled checked state', async () => {
    const idAttr = 'apple-radio';
    const nameAttr = 'fruit';
    const valueAttr = 'apple';
    const isChecked = true;
    const isDisabled = true;
    const text = 'Apple';

    const { getByText } = render(
      <Radio
        id={idAttr}
        name={nameAttr}
        value={valueAttr}
        isChecked={isChecked}
        isDisabled={isDisabled}
        text={text}
      />,
    );

    const labelEl = getByText(text).closest(
      'label',
    ) as never as HTMLLabelElement;
    const radioEl = within(labelEl).getByRole('radio');

    expect(radioEl).toHaveAttribute('checked');
    expect(radioEl).toHaveAttribute('id', idAttr);
    expect(radioEl).toHaveAttribute('name', nameAttr);
    expect(radioEl).toHaveAttribute('value', valueAttr);
    expect(radioEl).toHaveAttribute('disabled');
    expect(radioEl).not.toHaveAttribute('required');

    await within(labelEl).findByTitle('Radio on');
  });

  it('Renders in the disabled un-checked state', async () => {
    const idAttr = 'apple-radio';
    const nameAttr = 'fruit';
    const valueAttr = 'apple';
    const isChecked = false;
    const isDisabled = true;
    const text = 'Apple';

    const { getByText } = render(
      <Radio
        id={idAttr}
        name={nameAttr}
        value={valueAttr}
        isChecked={isChecked}
        isDisabled={isDisabled}
        text={text}
      />,
    );

    const labelEl = getByText(text).closest(
      'label',
    ) as never as HTMLLabelElement;
    const radioEl = within(labelEl).getByRole('radio');

    expect(radioEl).not.toHaveAttribute('checked');
    expect(radioEl).toHaveAttribute('id', idAttr);
    expect(radioEl).toHaveAttribute('name', nameAttr);
    expect(radioEl).toHaveAttribute('value', valueAttr);
    expect(radioEl).toHaveAttribute('disabled');
    expect(radioEl).not.toHaveAttribute('required');

    await within(labelEl).findByTitle('Circle');
  });

  it('Renders without text', () => {
    const idAttr = 'apple-radio';
    const nameAttr = 'fruit';
    const valueAttr = 'apple';
    const isChecked = true;

    const { queryByTestId } = render(
      <Radio
        id={idAttr}
        name={nameAttr}
        value={valueAttr}
        isChecked={isChecked}
      />,
    );

    const textEl = queryByTestId(idAttr);
    expect(textEl).not.toBeInTheDocument();
  });

  it('Renders with the "required" attribute', async () => {
    const idAttr = 'apple-radio';
    const nameAttr = 'fruit';
    const valueAttr = 'apple';
    const isChecked = false;
    const isRequired = true;
    const text = 'Apple';

    const { getByText } = render(
      <Radio
        id={idAttr}
        name={nameAttr}
        value={valueAttr}
        isChecked={isChecked}
        isRequired={isRequired}
        text={text}
      />,
    );

    const labelEl = getByText(text).closest(
      'label',
    ) as never as HTMLLabelElement;
    const radioEl = within(labelEl).getByRole('radio');

    expect(radioEl).not.toHaveAttribute('checked');
    expect(radioEl).toHaveAttribute('id', idAttr);
    expect(radioEl).toHaveAttribute('name', nameAttr);
    expect(radioEl).toHaveAttribute('value', valueAttr);
    expect(radioEl).not.toHaveAttribute('disabled');
    expect(radioEl).toHaveAttribute('required');

    await within(labelEl).findByTitle('Circle');
  });

  it('Renders with custom styles', () => {
    const idAttr = 'apple-radio';
    const nameAttr = 'fruit';
    const valueAttr = 'apple';
    const isChecked = false;

    render(
      <Radio
        id={idAttr}
        name={nameAttr}
        value={valueAttr}
        isChecked={isChecked}
        css={{ backgroundColor: 'blue' }}
      />,
    );

    const labelEl = document.getElementsByTagName('label')[0];
    expect(labelEl).toBeInTheDocument();
    expect(labelEl).toHaveStyleRule('background-color', 'blue');
  });
});
