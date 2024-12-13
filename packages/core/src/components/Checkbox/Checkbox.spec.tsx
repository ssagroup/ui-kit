import userEvent from '@testing-library/user-event';
import { getByRole } from '@testing-library/dom';
import { ThemeProvider } from '@emotion/react';
import colors from '@themes/main';
import { useForm } from 'react-hook-form';

import Checkbox, { CheckboxProps } from './index';
import FormCheckbox from '@components/FormCheckbox/index';

const checkLabel = () => {
  const labelEl = document.getElementsByTagName('label')[0];
  expect(labelEl).toBeInTheDocument();
  expect(labelEl).toHaveAttribute('for');

  return labelEl;
};

const checkIcon = (labelEl: HTMLLabelElement, isChecked: boolean) => {
  const icons = labelEl.getElementsByTagName('svg');

  if (isChecked) {
    expect(icons.length).toEqual(1);
    expect(icons[0]).toBeInTheDocument();
  } else {
    expect(icons.length).toEqual(0);
  }
};

const checkToggle = async (
  container: HTMLElement,
  mockOnChange: () => void,
  labelEl: HTMLLabelElement,
  isChecked: boolean,
) => {
  checkIcon(labelEl, isChecked);
  const checkboxEl: HTMLInputElement = getByRole(container, 'checkbox', {
    checked: isChecked,
  });
  expect(checkboxEl.id).toEqual(labelEl.getAttribute('for'));

  const newIsChecked = !isChecked;

  await userEvent.click(labelEl);

  expect(checkboxEl.checked).toBe(newIsChecked);
  expect(mockOnChange).toBeCalledWith(newIsChecked);

  checkIcon(labelEl, newIsChecked);
};

function setup(props: Omit<CheckboxProps, 'onChange'> = {}) {
  const mockOnChange = jest.fn();
  return {
    user: userEvent.setup(),
    mockOnChange,
    ...render(<Checkbox onChange={mockOnChange} {...props} />),
  };
}

describe('Checkbox', () => {
  it('Renders without text', async () => {
    const { mockOnChange, container } = setup();

    const labelEl = checkLabel();
    await checkToggle(container, mockOnChange, labelEl, false);
  });

  it('Renders with text', async () => {
    const text = 'some text';

    const { container, mockOnChange } = setup({ text });

    const labelEl = checkLabel();
    expect(labelEl).toHaveTextContent(text);
    await checkToggle(container, mockOnChange, labelEl, false);
    expect(labelEl).toHaveTextContent(text);
  });

  it('Renders with custom id', () => {
    const checkboxId = 'my-checkbox';
    const { getByRole } = setup({ id: checkboxId });
    const checkboxEl = getByRole('checkbox', { checked: false });

    const labelEl = document.getElementsByTagName('label')[0];
    expect(labelEl).toBeInTheDocument();
    expect(checkboxEl.id).toEqual(checkboxId);
    expect(checkboxEl.id).toEqual(labelEl.getAttribute('for'));
  });

  it('Renders in the disabled state', async () => {
    const { getByRole, user, mockOnChange } = setup({ isDisabled: true });

    const checkboxEl = getByRole('checkbox', { checked: false });

    await user.click(checkboxEl);
    expect(mockOnChange).not.toBeCalled();
  });

  it('Renders with the initial state passed in props', async () => {
    const isChecked = true;
    const { container, mockOnChange } = setup({ initialState: isChecked });

    const labelEl = checkLabel();
    await checkToggle(container, mockOnChange, labelEl, isChecked);
  });

  it('Renders with the external state passed in props', async () => {
    const isChecked = true;
    const { container, mockOnChange } = setup({ externalState: isChecked });

    const labelEl = checkLabel();
    await checkToggle(container, mockOnChange, labelEl, isChecked);
  });

  it('Renders in the indeterminate state', () => {
    const { getByRole, rerender, mockOnChange } = setup({
      isIndeterminate: true,
    });

    let checkboxEl = getByRole('checkbox');
    expect(checkboxEl).not.toBeChecked();
    expect(checkboxEl).toHaveProperty('indeterminate', true);

    rerender(
      <ThemeProvider theme={colors}>
        <Checkbox onChange={mockOnChange} isIndeterminate={false} />
      </ThemeProvider>,
    );

    checkboxEl = getByRole('checkbox');
    expect(checkboxEl).not.toBeChecked();
    expect(checkboxEl).toHaveProperty('indeterminate', false);
  });

  it('Renders with the "name" attribute', () => {
    const name = 'nice-checkbox';
    const { getByRole } = setup({ name });
    const checkboxEl = getByRole('checkbox');
    expect(checkboxEl).toHaveAttribute('name', name);
  });

  it('Renders with the "required" attribute', () => {
    const { getByRole } = setup({ isRequired: true });
    const checkboxEl = getByRole('checkbox');
    expect(checkboxEl).toHaveAttribute('required', name);
  });

  it('Renders with default green style', () => {
    const { getByTestId, getByRole } = setup({ color: 'green' });
    const input = getByRole('checkbox');
    input.focus();
    const div = getByTestId('icon-wrapper');
    const computedStyle = window.getComputedStyle(div);
    expect(computedStyle.boxShadow).toBe(
      '-4px 4px 10px rgba(82, 197, 135, 0.4)',
    );
  });

  it('Renders with default blue style', () => {
    const { getByTestId, getByRole } = setup({ color: 'blue' });
    const input = getByRole('checkbox');
    input.focus();
    const div = getByTestId('icon-wrapper');
    const computedStyle = window.getComputedStyle(div);
    expect(computedStyle.boxShadow).toBe(
      '-4px 4px 10px rgba(0, 133, 226, 0.4)',
    );
  });

  it('Renders with custom style', () => {
    const { getByRole } = setup({ color: 'custom' });
    const input = getByRole('checkbox');
    expect(input).toHaveStyle('border: 0; height: 1px; width: 1px;');
  });

  it('Renders without onchange handler', async () => {
    const { container } = render(<Checkbox />);
    const checkboxEl: HTMLInputElement = getByRole(container, 'checkbox', {
      checked: false,
    });
    const labelEl = checkLabel();
    await userEvent.click(labelEl);

    expect(checkboxEl.checked).toBe(true);
  });

  describe('FormCheckbox', () => {
    type TestFormValues = {
      consent: boolean;
    };

    const TestForm = ({
      onFormSubmit,
    }: {
      onFormSubmit: (data: TestFormValues) => void;
    }) => {
      const { control, handleSubmit } = useForm<TestFormValues>();
      const onSubmit = handleSubmit((data) => onFormSubmit(data));

      return (
        <form onSubmit={onSubmit}>
          <FormCheckbox
            control={control}
            name="consent"
            text="Give your consent"
          />
          <input type="submit" />
        </form>
      );
    };

    it('Renders and is connected to the form', async () => {
      const user = userEvent.setup();
      const onMockFormSubmit = jest.fn();

      const { getByLabelText } = render(
        <TestForm onFormSubmit={onMockFormSubmit} />,
      );

      const checkboxEl = getByLabelText('Give your consent');
      expect(checkboxEl).toHaveProperty('checked', false);
      const submitEl = document.querySelector('input[type="submit"]');

      await user.click(checkboxEl);
      await user.click(submitEl as HTMLInputElement);

      expect(onMockFormSubmit).toBeCalledWith({ consent: true });
    });
  });
});
