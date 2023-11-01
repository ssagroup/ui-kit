import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import Radio from '@components/Radio';
import FormRadioGroup from './FormRadioGroup';

describe('FormRadioGroup', () => {
  type TestFormValues = {
    tree: boolean;
  };

  const TestForm = ({
    onFormSubmit,
    ...props
  }: {
    onFormSubmit: (data: TestFormValues) => void;
    isRequired?: boolean;
  }) => {
    const { control, handleSubmit } = useForm<TestFormValues>();
    const onSubmit = handleSubmit((data) => onFormSubmit(data));

    return (
      <form onSubmit={onSubmit}>
        <FormRadioGroup<TestFormValues>
          name="tree"
          control={control}
          {...props}>
          <Radio id="radio1" value="oak" text="Oak" />
          <Radio id="radio2" value="spruce" text="Spruce" />
          <Radio id="radio3" value="chestnut" text="Chestnut" />
        </FormRadioGroup>

        <input type="submit" />
      </form>
    );
  };

  it('Renders and is connected to the form', async () => {
    const user = userEvent.setup();
    const onMockFormSubmit = jest.fn();

    const { getAllByRole, getByText } = render(
      <TestForm onFormSubmit={onMockFormSubmit} isRequired={false} />,
    );

    const radioEls = getAllByRole('radio');
    expect(radioEls.length).toBe(3);

    for (const radioEl of radioEls) {
      expect(radioEl).not.toBeChecked();
    }

    const submitEl = document.querySelector('input[type="submit"]');

    await user.click(
      getByText('Spruce').closest('label') as never as HTMLLabelElement,
    );
    await user.click(submitEl as HTMLInputElement);

    expect(onMockFormSubmit).toBeCalledWith({ tree: 'spruce' });

    expect((getAllByRole('radio')[1] as HTMLInputElement)?.checked).toBe(true);
  });

  it('Renders with default value', () => {
    const onMockFormSubmit = jest.fn();

    const { getAllByRole } = render(
      <TestForm onFormSubmit={onMockFormSubmit} />,
    );

    const radioEls = getAllByRole('radio');
    expect(radioEls.length).toBe(3);
  });
});
