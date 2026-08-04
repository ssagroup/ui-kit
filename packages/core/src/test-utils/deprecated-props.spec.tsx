import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionGroupContextProvider,
  AccordionTitle,
} from '@components/AccordionGroup';
import { Breadcrumbs } from '@components/Breadcrumbs';
import Button from '@components/Button';
import CardContent from '@components/CardContent';
import DropdownToggle from '@components/DropdownToggle';
import LargeTab from '@components/LargeTab';
import { Pagination, PaginationContextProvider } from '@components/Pagination';
import Tab from '@components/Tab';
import { ButtonGroup } from '@components/ButtonGroup';
import Checkbox from '@components/Checkbox';
import Dropdown from '@components/Dropdown';
import DropdownOption from '@components/DropdownOption';
import FileAttachment from '@components/FileAttachment';
import Radio from '@components/Radio';
import RadioGroup from '@components/RadioGroup';
import Switch from '@components/Switch';
import { SwitchContextProvider } from '@components/Switch/SwitchContext';
import TableRow from '@components/TableRow';
import { Typeahead } from '@components/Typeahead';
import { TypeaheadOption } from '@components/Typeahead/components/TypeaheadOption';
import { ColorPicker } from '@components/ColorPicker';
import { Drawer, useDrawer, type UseDrawerOptions } from '@components/Drawer';
import {
  FiltersMultiSelect,
  FiltersMultiSelectOption,
  FiltersMultiSelectOptions,
  useFilterMultiSelect,
  type UseFiltersMultiSelectOptions,
  type UseFiltersMultiSelectStore,
} from '@components/FiltersMultiSelect';
import Modal from '@components/Modal';
import ModalContent from '@components/ModalContent';
import ModalDialog from '@components/ModalDialog';
import ModalDismissButton from '@components/ModalDismissButton';
import ModalOpenButton from '@components/ModalOpenButton';
import { Popover, PopoverContent, PopoverTrigger } from '@components/Popover';
import Tooltip from '@components/Tooltip';
import TooltipContent from '@components/TooltipContent';
import TooltipTrigger from '@components/TooltipTrigger';
import { resetDeprecationWarnings } from '@utils/deprecation';

/**
 * Only our own deprecation notices. `jest-setup.ts` filters unrelated console
 * noise, but spying on `console.warn` replaces that wrapper — so third-party
 * warnings (e.g. Input's "should be used with React Hook Form register") would
 * otherwise be counted here.
 */
const deprecationWarnings = (spy: jest.SpyInstance): string[] =>
  spy.mock.calls
    .map((call) => String(call[0]))
    .filter((message) => message.startsWith('[ssa-ui-kit]'));

/**
 * `isDisabled` → `disabled` (issue #656, Phase 2, chunk 1 finding 1).
 *
 * The rename lands as an additive alias: `disabled` is the supported prop,
 * `isDisabled` keeps working for one minor and warns once in dev. These tests
 * pin all three halves of that contract — the new prop works, the old prop
 * still works, and the old prop warns.
 */
describe('deprecated props => isDisabled → disabled', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetDeprecationWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  const attachment = { name: 'report.pdf', size: 1024 };

  const cases: Array<{
    name: string;
    render: (props: {
      disabled?: boolean;
      isDisabled?: boolean;
    }) => React.JSX.Element;
    assertDisabled: () => void;
  }> = [
    {
      name: 'Button',
      render: (props) => <Button text="Save" {...props} />,
      assertDisabled: () =>
        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled(),
    },
    {
      name: 'Checkbox',
      render: (props) => <Checkbox id="terms" text="Accept" {...props} />,
      assertDisabled: () => expect(screen.getByRole('checkbox')).toBeDisabled(),
    },
    {
      name: 'Radio',
      render: (props) => <Radio value="one" text="One" {...props} />,
      assertDisabled: () => expect(screen.getByRole('radio')).toBeDisabled(),
    },
    {
      name: 'Switch',
      render: (props) => (
        <SwitchContextProvider initialState={false}>
          <Switch label="Notifications" {...props} />
        </SwitchContextProvider>
      ),
      assertDisabled: () => expect(screen.getByRole('switch')).toBeDisabled(),
    },
    {
      name: 'TableRow',
      render: (props) => (
        <table>
          <tbody>
            <TableRow {...props}>
              <td>Cell</td>
            </TableRow>
          </tbody>
        </table>
      ),
      assertDisabled: () =>
        expect(screen.getByRole('row')).toHaveAttribute(
          'aria-disabled',
          'true',
        ),
    },
    {
      name: 'FileAttachment',
      render: (props) => (
        <FileAttachment file={attachment} onRemove={jest.fn()} {...props} />
      ),
      assertDisabled: () =>
        expect(
          screen.getByRole('button', { name: `Remove ${attachment.name}` }),
        ).toBeDisabled(),
    },
    {
      name: 'Dropdown',
      render: (props) => (
        <Dropdown {...props}>
          <DropdownOption value="apple">Apple</DropdownOption>
        </Dropdown>
      ),
      assertDisabled: () =>
        expect(
          screen.getByTestId('dropdown').querySelector('button'),
        ).toBeDisabled(),
    },
  ];

  describe.each(cases)('$name', ({ render: renderCase, assertDisabled }) => {
    it('is disabled by the supported `disabled` prop, without warning', () => {
      render(renderCase({ disabled: true }));

      assertDisabled();
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('is still disabled by the deprecated `isDisabled` prop', () => {
      render(renderCase({ isDisabled: true }));

      assertDisabled();
    });

    it('warns once when the deprecated `isDisabled` prop is used', () => {
      render(renderCase({ isDisabled: true }));

      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`isDisabled`');
      expect(deprecationWarnings(warnSpy)[0]).toContain('`disabled`');
    });
  });

  it('disables ButtonGroup items via the item-level `disabled` key', () => {
    render(
      <ButtonGroup
        items={[
          { id: 1, text: 'All' },
          { id: 2, text: 'Running', disabled: true },
        ]}
        onClick={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'All' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Running' })).toBeDisabled();
    expect(deprecationWarnings(warnSpy)).toHaveLength(0);
  });

  it('still honours the deprecated item-level `isDisabled` key, with a warning', () => {
    render(
      <ButtonGroup
        items={[{ id: 1, text: 'Running', isDisabled: true }]}
        onClick={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Running' })).toBeDisabled();
    expect(deprecationWarnings(warnSpy)).toHaveLength(1);
  });

  it('lets `disabled` win when a component receives both spellings', () => {
    render(<Button text="Save" disabled={false} isDisabled />);

    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled();
    expect(deprecationWarnings(warnSpy)).toHaveLength(1);
  });
});

/**
 * Controlled/uncontrolled renames (issue #656, Phase 2, chunk 1 finding 3):
 *
 *   Radio.isChecked            → checked
 *   Checkbox.initialState      → defaultChecked
 *   Checkbox.externalState     → checked
 *   RadioGroup.externalState   → value
 *   ButtonGroup.externalState  → value   (and selectedItem → value)
 *
 * Unlike `isDisabled`, the last three are **not** pure renames: the deprecated
 * props are synced *into* internal state, so the control still moves on click
 * even when the parent ignores the change callback. The replacements are fully
 * controlled. Both behaviours are pinned below, because the whole point of
 * keeping the legacy path is that existing consumers do not change behaviour.
 */
describe('deprecated props => controlled/uncontrolled renames', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetDeprecationWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  // RadioGroup matches children on `child.type === Radio`, so these have to be
  // direct element children — a fragment wrapper would hide them.
  const radios = [
    <Radio key="r1" id="r1" value="apple" text="Apple" />,
    <Radio key="r2" id="r2" value="orange" text="Orange" />,
  ];

  describe('Radio.isChecked → checked', () => {
    it('is checked by the supported `checked` prop, without warning', () => {
      render(<Radio value="apple" text="Apple" checked onChange={jest.fn()} />);

      expect(screen.getByRole('radio')).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('is still checked by the deprecated `isChecked` prop, with a warning', () => {
      render(
        <Radio value="apple" text="Apple" isChecked onChange={jest.fn()} />,
      );

      expect(screen.getByRole('radio')).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`isChecked`');
    });
  });

  describe('Checkbox.initialState → defaultChecked', () => {
    it('seeds from the supported `defaultChecked` prop, without warning', () => {
      render(<Checkbox text="Accept" defaultChecked />);

      expect(screen.getByRole('checkbox')).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still seeds from the deprecated `initialState` prop, with a warning', () => {
      render(<Checkbox text="Accept" initialState />);

      expect(screen.getByRole('checkbox')).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`initialState`');
    });

    it('leaves the seeded checkbox free to toggle', async () => {
      const user = userEvent.setup();
      render(<Checkbox text="Accept" defaultChecked />);

      await user.click(screen.getByRole('checkbox'));

      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
  });

  describe('Checkbox.externalState → checked', () => {
    it('`checked` is fully controlled — it does not move without the parent', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(<Checkbox text="Accept" checked={false} onChange={onChange} />);

      await user.click(screen.getByRole('checkbox'));

      expect(onChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('`externalState` keeps its looser legacy behaviour — it still self-toggles', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      render(
        <Checkbox text="Accept" externalState={false} onChange={onChange} />,
      );

      await user.click(screen.getByRole('checkbox'));

      // The parent ignored onChange, yet the box moved. This is the behaviour
      // existing consumers depend on, so the legacy path must preserve it.
      expect(onChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole('checkbox')).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`externalState`');
    });

    it('reflects a `checked` value pushed down by the parent', () => {
      const { rerender } = render(<Checkbox text="Accept" checked={false} />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();

      rerender(<Checkbox text="Accept" checked={true} />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('RadioGroup.externalState → value', () => {
    it('selects via the supported `value` prop, without warning', () => {
      render(
        <RadioGroup name="fruit" value="orange" onChange={jest.fn()}>
          {radios}
        </RadioGroup>,
      );

      expect(screen.getAllByRole('radio')[1]).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('seeds from `defaultValue` and stays free to move', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup name="fruit" defaultValue="orange" onChange={jest.fn()}>
          {radios}
        </RadioGroup>,
      );

      expect(screen.getAllByRole('radio')[1]).toBeChecked();

      await user.click(screen.getAllByRole('radio')[0]);
      expect(screen.getAllByRole('radio')[0]).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still selects via the deprecated `externalState`, with a warning', () => {
      render(
        <RadioGroup name="fruit" externalState="orange" onChange={jest.fn()}>
          {radios}
        </RadioGroup>,
      );

      expect(screen.getAllByRole('radio')[1]).toBeChecked();
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`externalState`');
    });
  });

  describe('ButtonGroup.externalState / selectedItem → value', () => {
    const items = [
      { id: 1, text: 'All' },
      { id: 2, text: 'Running' },
    ];

    it('activates via the supported `value` prop, without warning', () => {
      render(
        <ButtonGroup items={items} value={items[1]} onClick={jest.fn()} />,
      );

      expect(screen.getByRole('button', { pressed: true }).textContent).toBe(
        'Running',
      );
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still activates via the deprecated `selectedItem`, with a warning', () => {
      render(
        <ButtonGroup
          items={items}
          selectedItem={items[1]}
          onClick={jest.fn()}
        />,
      );

      expect(screen.getByRole('button', { pressed: true }).textContent).toBe(
        'Running',
      );
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
    });

    it('still activates via the deprecated `externalState`, with a warning', () => {
      render(
        <ButtonGroup
          items={items}
          externalState={items[1]}
          onClick={jest.fn()}
        />,
      );

      expect(screen.getByRole('button', { pressed: true }).textContent).toBe(
        'Running',
      );
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
    });

    it('defaults to the first item when nothing is supplied', () => {
      render(<ButtonGroup items={items} onClick={jest.fn()} />);

      expect(screen.getByRole('button', { pressed: true }).textContent).toBe(
        'All',
      );
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('`value` is fully controlled — it does not move without the parent', async () => {
      const onClick = jest.fn();
      const user = userEvent.setup();
      render(<ButtonGroup items={items} value={items[0]} onClick={onClick} />);

      await user.click(screen.getByRole('button', { name: 'Running' }));

      expect(onClick).toHaveBeenCalledWith(items[1]);
      expect(screen.getByRole('button', { pressed: true }).textContent).toBe(
        'All',
      );
    });
  });
});

/**
 * Controlled-value renames (issue #656, Phase 2, chunk 1 finding 6):
 *
 *   Typeahead.selectedItems        → value
 *   Typeahead.defaultSelectedItems → defaultValue
 *   ColorPicker.color              → value
 *   ColorPicker.defaultColor       → defaultValue
 *
 * Unlike finding 3, these are **pure** renames: both components already back
 * their value with `useUncontrolled`, so the controlled/uncontrolled semantics
 * were already correct and only the spelling changes.
 */
describe('deprecated props => controlled-value renames', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetDeprecationWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  describe('Typeahead.selectedItems → value', () => {
    const options = [
      <TypeaheadOption key="1" value={1} label="First">
        First
      </TypeaheadOption>,
      <TypeaheadOption key="2" value={2} label="Second">
        Second
      </TypeaheadOption>,
    ];

    const renderTypeahead = (props: Record<string, unknown>) => {
      const Harness = () => {
        const form = useForm({ defaultValues: {} });
        return (
          <FormProvider {...form}>
            <Typeahead name="pick" isMultiple {...props}>
              {options}
            </Typeahead>
          </FormProvider>
        );
      };
      return render(<Harness />);
    };

    it('selects via the supported `value` prop, without warning', () => {
      renderTypeahead({ value: [2] });

      expect(screen.getByRole('combobox')).toHaveTextContent('Second');
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still selects via the deprecated `selectedItems`, with a warning', () => {
      renderTypeahead({ selectedItems: [2] });

      expect(screen.getByRole('combobox')).toHaveTextContent('Second');
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`selectedItems`');
      expect(deprecationWarnings(warnSpy)[0]).toContain('`value`');
    });

    it('seeds via the supported `defaultValue` prop, without warning', () => {
      renderTypeahead({ defaultValue: [1] });

      expect(screen.getByRole('combobox')).toHaveTextContent('First');
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still seeds via the deprecated `defaultSelectedItems`, with a warning', () => {
      renderTypeahead({ defaultSelectedItems: [1] });

      expect(screen.getByRole('combobox')).toHaveTextContent('First');
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain(
        '`defaultSelectedItems`',
      );
    });
  });

  describe('ColorPicker.color → value', () => {
    const openCustomTab = async (user: ReturnType<typeof userEvent.setup>) => {
      await user.click(screen.getByTestId('color-picker-trigger'));
      await user.click(screen.getByRole('tab', { name: 'Custom' }));
      return screen.getByRole('textbox') as HTMLInputElement;
    };

    it('applies the supported `value` prop, without warning', async () => {
      const user = userEvent.setup();
      render(<ColorPicker value="#00FF00" />);

      const hex = await openCustomTab(user);

      expect(hex.value.toLowerCase()).toContain('00ff00');
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still applies the deprecated `color` prop, with a warning', async () => {
      const user = userEvent.setup();
      render(<ColorPicker color="#00FF00" />);

      const hex = await openCustomTab(user);

      expect(hex.value.toLowerCase()).toContain('00ff00');
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`color`');
      expect(deprecationWarnings(warnSpy)[0]).toContain('`value`');
    });

    it('still seeds from the deprecated `defaultColor` prop, with a warning', async () => {
      const user = userEvent.setup();
      render(<ColorPicker defaultColor="#00FF00" />);

      const hex = await openCustomTab(user);

      expect(hex.value.toLowerCase()).toContain('00ff00');
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`defaultColor`');
    });
  });
});

/**
 * camelCase ARIA → native ARIA (issue #656, Phase 2, chunk 3 finding 2):
 *
 *   ariaLabel      → aria-label
 *   ariaLabelledby → aria-labelledby
 *   ariaControls   → aria-controls
 *
 * These were bespoke props that each component had to forward by hand, which
 * made them invisible to `eslint-plugin-jsx-a11y` and to the axe gate — and, in
 * `CardContent`'s case, meant the value never reached the DOM at all. The
 * native spelling is now supported everywhere; the camelCase one stays as a
 * warning alias.
 */
describe('deprecated props => camelCase ARIA → native ARIA', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetDeprecationWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  const noop = () => null;

  const cases: Array<{
    name: string;
    nativeProp: string;
    deprecatedProp: string;
    render: (props: Record<string, string>) => React.JSX.Element;
    getTarget: () => HTMLElement;
  }> = [
    {
      name: 'Breadcrumbs',
      nativeProp: 'aria-label',
      deprecatedProp: 'ariaLabel',
      render: (props) => (
        <MemoryRouter>
          <Breadcrumbs
            items={[{ label: 'Home', to: '/' }, { label: 'Now' }]}
            {...props}
          />
        </MemoryRouter>
      ),
      getTarget: () => screen.getByRole('navigation'),
    },
    {
      name: 'Pagination',
      nativeProp: 'aria-label',
      deprecatedProp: 'ariaLabel',
      render: (props) => (
        <PaginationContextProvider>
          <Pagination pagesCount={3} {...props} />
        </PaginationContextProvider>
      ),
      getTarget: () => screen.getByRole('navigation'),
    },
    {
      name: 'CardContent',
      nativeProp: 'aria-labelledby',
      deprecatedProp: 'ariaLabelledby',
      render: (props) => (
        <CardContent role="region" {...props}>
          Body
        </CardContent>
      ),
      getTarget: () => screen.getByRole('region'),
    },
    {
      name: 'DropdownToggle (labelledby)',
      nativeProp: 'aria-labelledby',
      deprecatedProp: 'ariaLabelledby',
      render: (props) => (
        <DropdownToggle isOpen={false} onClick={jest.fn()} {...props}>
          Pick one
        </DropdownToggle>
      ),
      getTarget: () => screen.getByRole('combobox'),
    },
    {
      name: 'DropdownToggle (controls)',
      nativeProp: 'aria-controls',
      deprecatedProp: 'ariaControls',
      render: (props) => (
        <DropdownToggle isOpen={false} onClick={jest.fn()} {...props}>
          Pick one
        </DropdownToggle>
      ),
      getTarget: () => screen.getByRole('combobox'),
    },
    {
      name: 'Tab',
      nativeProp: 'aria-controls',
      deprecatedProp: 'ariaControls',
      render: (props) => (
        <Tab tabId="year" text="Year" renderContent={noop} {...props} />
      ),
      getTarget: () => screen.getByRole('tab'),
    },
    {
      name: 'LargeTab',
      nativeProp: 'aria-controls',
      deprecatedProp: 'ariaControls',
      render: (props) => (
        <LargeTab
          tabId="mon"
          topText="Mon"
          bottomText="12"
          renderContent={noop}
          {...props}
        />
      ),
      getTarget: () => screen.getByRole('tab'),
    },
    {
      name: 'Accordion',
      nativeProp: 'aria-controls',
      deprecatedProp: 'ariaControls',
      render: (props) => (
        <Accordion
          id="terms"
          title="Terms"
          renderTitle={AccordionTitle}
          renderContent={noop}
          {...props}
        />
      ),
      // Accordion's `aria-controls` labels the title button, not the region.
      getTarget: () => screen.getByTestId('accordion-title'),
    },
  ];

  describe.each(cases)(
    '$name',
    ({ nativeProp, deprecatedProp, render: renderCase, getTarget }) => {
      it(`applies the supported \`${nativeProp}\` prop, without warning`, () => {
        render(renderCase({ [nativeProp]: 'native-id' }));

        expect(getTarget()).toHaveAttribute(nativeProp, 'native-id');
        expect(deprecationWarnings(warnSpy)).toHaveLength(0);
      });

      it(`still applies the deprecated \`${deprecatedProp}\` prop, with a warning`, () => {
        render(renderCase({ [deprecatedProp]: 'legacy-id' }));

        expect(getTarget()).toHaveAttribute(nativeProp, 'legacy-id');
        expect(deprecationWarnings(warnSpy)).toHaveLength(1);
        expect(deprecationWarnings(warnSpy)[0]).toContain(
          `\`${deprecatedProp}\``,
        );
        expect(deprecationWarnings(warnSpy)[0]).toContain(`\`${nativeProp}\``);
      });

      it('lets the native spelling win when both are supplied', () => {
        render(
          renderCase({
            [nativeProp]: 'native-id',
            [deprecatedProp]: 'legacy-id',
          }),
        );

        expect(getTarget()).toHaveAttribute(nativeProp, 'native-id');
        expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      });
    },
  );

  it('keeps the deprecated camelCase spelling off the DOM', () => {
    render(
      <CardContent role="region" ariaLabelledby="legacy-id">
        Body
      </CardContent>,
    );

    expect(screen.getByRole('region').outerHTML).not.toContain(
      'ariaLabelledby',
    );
  });

  it('uses Accordion `aria-controls` as the content panel id', () => {
    render(
      <Accordion
        id="terms"
        title="Terms"
        aria-controls="terms-panel"
        renderTitle={AccordionTitle}
        renderContent={({ id }) => <div id={id as string}>Body</div>}
      />,
    );

    expect(screen.getByText('Body')).toHaveAttribute('id', 'terms-panel');
    expect(screen.getByTestId('accordion-title')).toHaveAttribute(
      'aria-controls',
      'terms-panel',
    );
  });

  it('wires Dropdown to its listbox with native ARIA, without warning', () => {
    render(
      <Dropdown>
        <DropdownOption value="apple">Apple</DropdownOption>
      </Dropdown>,
    );

    const toggle = screen.getByRole('combobox');

    expect(toggle).toHaveAttribute('aria-labelledby');
    expect(toggle).toHaveAttribute('aria-controls');
    expect(deprecationWarnings(warnSpy)).toHaveLength(0);
  });
});

/**
 * Open state → `open` / `defaultOpen` / `onOpenChange` (issue #656, Phase 2,
 * chunk 3 items 2 and 3).
 *
 * The family carried four spellings of "is it open" — `open`, `opened`,
 * `isOpen` and `isOpened` — plus `initialOpen` and `defaultOpened` for the
 * uncontrolled seed. Two of those were also lying about what they did:
 * `Tooltip.isOpen` and `Accordion.isOpened` were documented as controlled but
 * only ever seeded initial state.
 */
describe('deprecated props => open state', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    resetDeprecationWarnings();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  const DrawerHarness = (props: UseDrawerOptions) => {
    const store = useDrawer(props);
    return (
      <Drawer.Root store={store}>
        <Drawer.Portal>
          <Drawer.Overlay>
            <Drawer.Content>Drawer body</Drawer.Content>
          </Drawer.Overlay>
        </Drawer.Portal>
      </Drawer.Root>
    );
  };

  const cases: Array<{
    name: string;
    prop: string;
    deprecatedProp: string;
    render: (props: Record<string, boolean>) => React.JSX.Element;
    getContent: () => HTMLElement | null;
  }> = [
    {
      name: 'Drawer (controlled)',
      prop: 'open',
      deprecatedProp: 'opened',
      render: (props) => <DrawerHarness {...props} />,
      getContent: () => screen.queryByText('Drawer body'),
    },
    {
      name: 'Drawer (uncontrolled seed)',
      prop: 'defaultOpen',
      deprecatedProp: 'defaultOpened',
      render: (props) => <DrawerHarness {...props} />,
      getContent: () => screen.queryByText('Drawer body'),
    },
    {
      name: 'Popover',
      prop: 'defaultOpen',
      deprecatedProp: 'initialOpen',
      render: (props) => (
        <Popover {...props}>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Popover body</PopoverContent>
        </Popover>
      ),
      getContent: () => screen.queryByText('Popover body'),
    },
    {
      name: 'Tooltip',
      prop: 'defaultOpen',
      deprecatedProp: 'isOpen',
      render: (props) => (
        <Tooltip {...props}>
          <TooltipTrigger>
            <button type="button">Trigger</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip body</TooltipContent>
        </Tooltip>
      ),
      getContent: () => screen.queryByText('Tooltip body'),
    },
    {
      name: 'Modal',
      prop: 'open',
      deprecatedProp: 'isOpen',
      render: (props) => (
        <Modal {...props}>
          <ModalContent aria-label="Dialog">Modal body</ModalContent>
        </Modal>
      ),
      getContent: () => screen.queryByText('Modal body'),
    },
    {
      name: 'ModalDialog',
      prop: 'open',
      deprecatedProp: 'isOpen',
      render: (props) => (
        <ModalDialog aria-label="Dialog" {...props}>
          Dialog body
        </ModalDialog>
      ),
      // ModalDialog always renders and hides itself with `display`, so presence
      // in the tree is not the signal here — see the visibility assertion below.
      getContent: () => screen.queryByText('Dialog body'),
    },
  ];

  describe.each(cases)(
    '$name',
    ({ name, prop, deprecatedProp, render: renderCase, getContent }) => {
      const isVisible = () =>
        name === 'ModalDialog'
          ? getContent()?.closest('[role="dialog"]')
          : getContent();

      it(`opens from the supported \`${prop}\` prop, without warning`, () => {
        render(renderCase({ [prop]: true }));

        expect(isVisible()).toBeVisible();
        expect(deprecationWarnings(warnSpy)).toHaveLength(0);
      });

      it(`still opens from the deprecated \`${deprecatedProp}\` prop, with a warning`, () => {
        render(renderCase({ [deprecatedProp]: true }));

        expect(isVisible()).toBeVisible();
        expect(deprecationWarnings(warnSpy)).toHaveLength(1);
        expect(deprecationWarnings(warnSpy)[0]).toContain(
          `\`${deprecatedProp}\``,
        );
        expect(deprecationWarnings(warnSpy)[0]).toContain(`\`${prop}\``);
      });

      it(`lets \`${prop}\` win when both are supplied`, () => {
        render(renderCase({ [prop]: true, [deprecatedProp]: false }));

        expect(isVisible()).toBeVisible();
        expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      });
    },
  );

  describe('Accordion.isOpened → open', () => {
    const renderAccordion = (props: Record<string, unknown>) =>
      render(
        <Accordion
          id="terms"
          title="Terms"
          aria-controls="terms-panel"
          renderTitle={AccordionTitle}
          renderContent={(contentProps) => (
            <AccordionContent {...contentProps}>
              Accordion body
            </AccordionContent>
          )}
          {...props}
        />,
      );

    const isExpanded = () =>
      screen.getByTestId('accordion-title').getAttribute('aria-expanded');

    it('expands from the supported `open` prop, without warning', () => {
      renderAccordion({ open: true });

      expect(isExpanded()).toBe('true');
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still expands from the deprecated `isOpened` prop, with a warning', () => {
      renderAccordion({ isOpened: true });

      expect(isExpanded()).toBe('true');
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`isOpened`');
      // `defaultOpen`, not `open` — `isOpened` only ever seeded the state, and
      // this is the replacement the codemod rewrites it to.
      expect(deprecationWarnings(warnSpy)[0]).toContain('`defaultOpen`');
    });

    it('passes both spellings to the render props, so custom renderers keep working', () => {
      const renderTitle = jest.fn(() => <div>Title</div>);
      const renderContent = jest.fn(() => <div>Body</div>);

      render(
        <Accordion
          id="terms"
          title="Terms"
          open
          renderTitle={renderTitle}
          renderContent={renderContent}
        />,
      );

      expect(renderTitle).toHaveBeenCalledWith(
        expect.objectContaining({ open: true, isOpened: true }),
      );
      expect(renderContent).toHaveBeenCalledWith(
        expect.objectContaining({ open: true, isOpened: true }),
      );
    });

    // The codemod maps a consumer-authored `isOpened` to `defaultOpen`, which
    // would be a silent regression if `defaultOpen` only worked inside a group.
    it('expands standalone from `defaultOpen`, with no group to drive it', () => {
      renderAccordion({ defaultOpen: true });

      expect(isExpanded()).toBe('true');
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('keeps the deprecated spelling off the DOM', () => {
      renderAccordion({ open: true });

      expect(screen.getByTestId('accordion-title').outerHTML).not.toContain(
        'isOpened',
      );
    });

    it('seeds the group from `defaultOpen`, without warning', () => {
      render(
        <AccordionGroupContextProvider>
          <AccordionGroup>
            <Accordion
              id="terms"
              title="Terms"
              defaultOpen
              renderTitle={AccordionTitle}
              renderContent={(contentProps) => (
                <AccordionContent {...contentProps}>
                  Accordion body
                </AccordionContent>
              )}
            />
          </AccordionGroup>
        </AccordionGroupContextProvider>,
      );

      expect(isExpanded()).toBe('true');
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('reports toggles through `onOpenChange`', async () => {
      const onOpenChange = jest.fn();
      const user = userEvent.setup();

      render(
        <AccordionGroupContextProvider>
          <AccordionGroup>
            <Accordion
              id="terms"
              title="Terms"
              onOpenChange={onOpenChange}
              renderTitle={AccordionTitle}
              renderContent={(contentProps) => (
                <AccordionContent {...contentProps}>
                  Accordion body
                </AccordionContent>
              )}
            />
          </AccordionGroup>
        </AccordionGroupContextProvider>,
      );

      await user.click(screen.getByTestId('accordion-title'));
      expect(onOpenChange).toHaveBeenCalledWith(true);

      await user.click(screen.getByTestId('accordion-title'));
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });
  });

  /**
   * `useFilterMultiSelect` was not in the audit's component list, but carries
   * the same family — including `onOpenedChange`, the one spelling nothing else
   * in the library used.
   */
  describe('useFilterMultiSelect open state', () => {
    const FiltersHarness = (props: UseFiltersMultiSelectOptions) => {
      const store = useFilterMultiSelect(props);
      return (
        <FiltersMultiSelect store={store} label="Filters">
          <FiltersMultiSelectOptions>
            <FiltersMultiSelectOption filter={{ id: 'a', label: 'Alpha' }}>
              Alpha
            </FiltersMultiSelectOption>
          </FiltersMultiSelectOptions>
        </FiltersMultiSelect>
      );
    };

    it('opens from `defaultOpen`, without warning', () => {
      render(<FiltersHarness defaultOpen />);

      expect(screen.getByText('Alpha')).toBeVisible();
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still opens from the deprecated `defaultOpened`, with a warning', () => {
      render(<FiltersHarness defaultOpened />);

      expect(screen.getByText('Alpha')).toBeVisible();
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`defaultOpened`');
      expect(deprecationWarnings(warnSpy)[0]).toContain('`defaultOpen`');
    });

    it('reports open changes through `onOpenChange`', () => {
      const onOpenChange = jest.fn();
      const { result } = renderHookStore({ onOpenChange });

      result.toggleDropdown(true);

      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(deprecationWarnings(warnSpy)).toHaveLength(0);
    });

    it('still reports through the deprecated `onOpenedChange`, with a warning', () => {
      const onOpenedChange = jest.fn();
      const { result } = renderHookStore({ onOpenedChange });

      result.toggleDropdown(true);

      expect(onOpenedChange).toHaveBeenCalledWith(true);
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
      expect(deprecationWarnings(warnSpy)[0]).toContain('`onOpenedChange`');
    });

    /** Renders the hook alone and hands back its latest store. */
    function renderHookStore(props: UseFiltersMultiSelectOptions) {
      const box: { result: UseFiltersMultiSelectStore } = {
        result: undefined as unknown as UseFiltersMultiSelectStore,
      };
      const Probe = () => {
        box.result = useFilterMultiSelect(props);
        return null;
      };
      render(<Probe />);
      return box;
    }
  });

  describe('Tooltip.open + onOpenChange', () => {
    const TooltipHarness = (props: Record<string, unknown>) => (
      <Tooltip {...props}>
        <TooltipTrigger>
          <button type="button">Trigger</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip body</TooltipContent>
      </Tooltip>
    );

    it('stays put when controlled and the parent ignores the change', async () => {
      const user = userEvent.setup();
      render(<TooltipHarness open={false} />);

      await user.click(screen.getByText('Trigger'));

      expect(screen.queryByText('Tooltip body')).not.toBeInTheDocument();
    });

    it('reports what it wants to do through `onOpenChange`', async () => {
      const onOpenChange = jest.fn();
      const user = userEvent.setup();
      render(<TooltipHarness open={false} onOpenChange={onOpenChange} />);

      await user.click(screen.getByText('Trigger'));

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('fires `onOpenChange` when uncontrolled too', async () => {
      const onOpenChange = jest.fn();
      const user = userEvent.setup();
      render(<TooltipHarness onOpenChange={onOpenChange} />);

      await user.click(screen.getByText('Trigger'));

      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.getByText('Tooltip body')).toBeVisible();
    });
  });

  /**
   * Chunk 3 item 3: the modal family had no way to tell a parent it had opened
   * or closed. `ModalOpenButton` / `ModalDismissButton` moved the state inside
   * the context and nothing came back out.
   */
  describe('Modal.onOpenChange', () => {
    const ModalHarness = (props: Record<string, unknown>) => (
      <Modal {...props}>
        <ModalOpenButton>
          <Button text="Open" />
        </ModalOpenButton>
        <ModalContent aria-label="Dialog">
          <ModalDismissButton>
            <Button text="Close" />
          </ModalDismissButton>
        </ModalContent>
      </Modal>
    );

    const clickButton = (
      user: ReturnType<typeof userEvent.setup>,
      label: string,
    ) => user.click(screen.getByRole('button', { name: label }));

    it('fires when ModalOpenButton and ModalDismissButton move the state', async () => {
      const onOpenChange = jest.fn();
      const user = userEvent.setup();
      render(<ModalHarness onOpenChange={onOpenChange} />);

      await clickButton(user, 'Open');
      expect(onOpenChange).toHaveBeenCalledWith(true);

      await clickButton(user, 'Close');
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    it('does not move on its own when `open` is supplied', async () => {
      const onOpenChange = jest.fn();
      const user = userEvent.setup();
      render(<ModalHarness open={false} onOpenChange={onOpenChange} />);

      await clickButton(user, 'Open');

      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('still lets the legacy `isOpen` path be closed from inside', async () => {
      const user = userEvent.setup();
      render(<ModalHarness isOpen />);

      expect(screen.getByRole('dialog')).toBeVisible();

      await clickButton(user, 'Close');

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(deprecationWarnings(warnSpy)).toHaveLength(1);
    });
  });
});
