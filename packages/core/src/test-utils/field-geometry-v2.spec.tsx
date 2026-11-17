/**
 * `fieldGeometryV2` on: the #703 geometry held back from 3.27.2.
 *
 * The flag-off path (pre-3.27.2 geometry) is pinned by each component's own
 * spec; this file pins the flag-on path, so both stay covered until the flag is
 * removed and the old branch with it.
 */
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { screen, within } from '@testing-library/react';
import { FeatureFlag, FeatureFlagsProvider } from '@contexts/FeatureFlags';
import { resetFeatureFlagWarnings } from '@contexts/FeatureFlags/createFeatureFlags';
import { Field } from '@components/Field';
import Input from '@components/Input';
import TextField from '@components/TextField';
import Label from '@components/Label';
import Dropdown from '@components/Dropdown';
import DropdownOption from '@components/DropdownOption';
import MultipleDropdown from '@components/MultipleDropdown';
import FileUpload from '@components/FileUpload';
import { DateRangePicker } from '@components/DateRangePicker';
import { Typeahead, TypeaheadOption } from '@components/Typeahead';

const withFlag = (ui: ReactNode, on = true) => (
  <FeatureFlagsProvider flags={{ [FeatureFlag.fieldGeometryV2]: on }}>
    {ui}
  </FeatureFlagsProvider>
);

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('fieldGeometryV2 on', () => {
  it('Field.Control is border-box with the shared 12px radius', () => {
    render(
      withFlag(
        <Field.Root>
          <Field.Control data-testid="control">
            <input aria-label="name" />
          </Field.Control>
        </Field.Root>,
      ),
    );
    const control = screen.getByTestId('control');
    expect(control).toHaveStyleRule('box-sizing', 'border-box');
    expect(control).toHaveStyleRule('border-radius', '12px');
  });

  it('Input is border-box', () => {
    render(withFlag(<Input name="email" register={jest.fn()} />));
    expect(screen.getByRole('textbox')).toHaveStyleRule(
      'box-sizing',
      'border-box',
    );
  });

  it('TextField renders no <label> without a label', () => {
    const { container } = render(
      withFlag(
        <FormWrapper>
          <TextField name="field" />
        </FormWrapper>,
      ),
    );
    expect(container.querySelector('label')).toBeNull();
  });

  it('TextField still renders a given label', () => {
    render(
      withFlag(
        <FormWrapper>
          <TextField name="field" label="Name" />
        </FormWrapper>,
      ),
    );
    expect(screen.getByText('Name').tagName).toBe('LABEL');
  });

  it('Label is top-aligned, with and without a badge', () => {
    render(
      withFlag(
        <>
          <Label htmlFor="a">Plain</Label>
          <Label htmlFor="b" badge={{ text: 'New' }}>
            Badged
          </Label>
        </>,
      ),
    );
    expect(screen.getByText('Plain')).toHaveStyleRule('vertical-align', 'top');
    const row = screen.getByText('Badged').parentElement as HTMLElement;
    expect(row).toHaveAttribute('data-field-geometry', 'v2');
  });

  it('Dropdown top-aligns its labelled wrapper', () => {
    render(
      withFlag(
        <Dropdown label="Channel" onChange={jest.fn()}>
          <DropdownOption value="a">A</DropdownOption>
        </Dropdown>,
      ),
    );
    const wrapper = screen.getByText('Channel').parentElement as HTMLElement;
    expect(wrapper).toHaveStyleRule('vertical-align', 'top');
  });

  it('MultipleDropdown toggle is 44px border-box with no 250px cap', () => {
    render(
      withFlag(
        <MultipleDropdown isMultiple onChange={jest.fn()}>
          <DropdownOption value="a">A</DropdownOption>
        </MultipleDropdown>,
      ),
    );
    const toggle = within(screen.getByTestId('dropdown')).getByRole('combobox');
    expect(toggle).toHaveStyleRule('box-sizing', 'border-box');
    expect(toggle).toHaveStyleRule('height', '44px');
    expect(toggle).not.toHaveStyleRule('height', '40px');
    expect(toggle).not.toHaveStyleRule('max-width', '250px');
  });

  it('FileUpload row has no vertical padding', () => {
    const { container } = render(withFlag(<FileUpload />));
    const row = container.querySelector('button')?.parentElement as HTMLElement;
    expect(row).toHaveStyleRule('padding', '0 14px 0 3px');
    expect(row).toHaveStyleRule('box-sizing', 'border-box');
  });

  it('DateRangePicker trigger has horizontal padding only', () => {
    render(
      withFlag(
        <FormWrapper>
          <DateRangePicker
            name="range"
            classNames={{ trigger: { controlsWrapper: 'my-wrapper' } }}
          />
        </FormWrapper>,
      ),
    );
    const wrapper = document.querySelector<HTMLElement>('.my-wrapper');
    expect(wrapper).toHaveStyleRule('padding', '0 14px');
  });

  it('Typeahead trigger is border-box', () => {
    render(
      withFlag(
        <FormWrapper>
          <Typeahead name="food">
            <TypeaheadOption value="apple" label="Apple">
              Apple
            </TypeaheadOption>
          </Typeahead>
        </FormWrapper>,
      ),
    );
    const trigger = screen
      .getAllByRole('combobox')
      .find((el) => el.tagName === 'DIV') as HTMLElement;
    expect(trigger).toHaveStyleRule('box-sizing', 'border-box');
  });
});

describe('fieldGeometryV2 off', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetFeatureFlagWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => warnSpy.mockRestore());

  const flagWarnings = () =>
    warnSpy.mock.calls
      .map((call) => String(call[0]))
      .filter((message) => message.includes('`fieldGeometryV2`'));

  it('warns once when the app has not decided', () => {
    render(
      <>
        <Label htmlFor="a">A</Label>
        <Label htmlFor="b">B</Label>
      </>,
    );
    expect(flagWarnings()).toHaveLength(1);
    expect(flagWarnings()[0]).toContain('4.0.0');
  });

  it('is silent when the app passes false', () => {
    render(withFlag(<Label htmlFor="a">A</Label>, false));
    expect(flagWarnings()).toHaveLength(0);
    expect(screen.getByText('A')).not.toHaveStyleRule('vertical-align', 'top');
  });
});
