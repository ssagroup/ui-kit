import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';

import { AccordionGroupContextProvider } from '@components/AccordionGroup';
import { Form } from '.';
import { getStorybookAvatar } from '@storybook-assets/avatars';
import { PRESENT_VALUE } from '@components/DateRangePicker/DateRangePickerFormBridge';

const managers = [
  {
    id: '1',
    name: 'John Doe',
    avatar: getStorybookAvatar(0),
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: getStorybookAvatar(1),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    avatar: getStorybookAvatar(2),
  },
] as const;

describe('Form (rjsf)', () => {
  it('Render form', () => {
    const { container } = render(
      <Form
        validator={validator}
        schema={{
          title: 'Test Form',
          description: 'Test Form Description',
          type: 'object',
          properties: {
            stringField: {
              title: 'String field title',
              type: 'string',
            },
            arrayField: {
              type: 'array',
              title: 'Array field title',
              description: 'Array field description',
              items: {
                type: 'string',
              },
            },
            checkboxField: {
              type: 'boolean',
              title: 'Checkbox field title',
            },
            radioField: {
              type: 'string',
              title: 'Radio field title',
              enum: ['Option 1', 'Option 2'],
            },
            checkboxesField: {
              type: 'array',
              title: 'Checkboxes field title',
              items: {
                type: 'string',
                enum: ['foo', 'bar', 'fuzz', 'qux'],
              },
              uniqueItems: true,
            },
            selectField: {
              type: 'string',
              title: 'Select field title',
              default: 'Option 1',
              enum: ['Option 1', 'Option 2'],
            },
            selectMultipleField: {
              type: 'array',
              title: 'Select multiple fields title',
              default: ['Option 1', 'Option 3'],
              items: {
                type: 'string',
                enum: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
              },
              uniqueItems: true,
            },
            managers: {
              type: 'array',
              title: 'Select managers',
              uniqueItems: true,
              items: {
                type: 'string',
                oneOf: managers.map((manager) => ({
                  const: manager.id,
                  title: manager.name,
                  avatar: manager.avatar,
                })),
              },
            },
            passwordField: {
              type: 'string',
              title: 'Password field title',
              minLength: 8,
            },
          },
        }}
        uiSchema={{
          stringField: {
            'ui:help': 'String field help',
            'ui:placeholder': 'String field placeholder',
          },
          checkboxField: {
            'ui:help': 'checkbox',
          },
          radioField: {
            'ui:widget': 'radio',
            'ui:options': {
              inline: true,
            },
          },
          checkboxesField: {
            'ui:widget': 'checkboxes',
            'ui:help': 'Checkboxes field help',
          },
          passwordField: {
            'ui:widget': 'password',
            'ui:help': 'Password field help',
          },
          managers: {
            'ui:widget': 'select',
            'ui:placeholder': 'Select managers...',
            'ui:options': {
              typeaheadAvatarSize: 24,
            },
          },
        }}
        formData={{
          stringField: 'String field value',
          arrayField: ['Item 1', 'Item 2'],
          checkboxField: true,
          radioField: 'Option 1',
          checkboxesField: ['foo', 'bar'],
          selectField: 'Option 2',
          selectMultipleField: ['Option 1', 'Option 3'],
          managers: [managers[0].id, managers[2].id],
          passwordField: 'password',
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('DateWidget converts yyyy-MM-dd to dd/mm/yyyy format for display', () => {
    const { getByTestId } = render(
      <Form
        validator={validator}
        schema={{
          type: 'object',
          properties: {
            dateField: {
              type: 'string',
              title: 'Date',
            },
          },
        }}
        uiSchema={{
          dateField: {
            'ui:widget': 'date',
            'ui:options': {
              format: 'dd/mm/yyyy',
              outputFormat: 'yyyy-MM-dd',
            },
          },
        }}
        formData={{
          dateField: '2024-01-15',
        }}
      />,
    );

    const dateInput = getByTestId('datepicker-input');
    expect(dateInput).toHaveValue('15/01/2024');
  });

  it('DateRangeField converts yyyy-MM-dd to dd/mm/yyyy format for display', () => {
    const { getByTestId } = render(
      <Form
        validator={validator}
        schema={{
          type: 'object',
          properties: {
            dateRangeField: {
              type: 'object',
              properties: {
                start: { type: 'string' },
                end: { type: 'string' },
              },
            },
          },
        }}
        uiSchema={{
          dateRangeField: {
            'ui:field': 'daterange',
            'ui:options': {
              format: 'dd/mm/yyyy',
              outputFormat: 'yyyy-MM-dd',
            },
          },
        }}
        formData={{
          dateRangeField: {
            start: '2024-01-15',
            end: '2024-12-31',
          },
        }}
      />,
    );

    const startInput = getByTestId('daterangepicker-input-from');
    const endInput = getByTestId('daterangepicker-input-to');
    expect(startInput).toHaveValue('15/01/2024');
    expect(endInput).toHaveValue('31/12/2024');
  });

  it('DateRangeField converts "present" string to null for picker and displays "Present"', () => {
    const { getByTestId } = render(
      <Form
        validator={validator}
        schema={{
          type: 'object',
          properties: {
            dateRangeField: {
              type: 'object',
              properties: {
                start: { type: 'string' },
                end: { type: 'string' },
              },
            },
          },
        }}
        uiSchema={{
          dateRangeField: {
            'ui:field': 'daterange',
            'ui:options': {
              format: 'dd/mm/yyyy',
              outputFormat: 'yyyy-MM-dd',
              showPresentOption: true,
            },
          },
        }}
        formData={{
          dateRangeField: {
            start: '2024-01-15',
            end: 'present',
          },
        }}
      />,
    );

    const startInput = getByTestId('daterangepicker-input-from');
    const endInput = getByTestId('daterangepicker-input-to');
    expect(startInput).toHaveValue('15/01/2024');
    expect(endInput).toHaveValue('Present');
  });

  it('DateRangeField converts null to PRESENT_VALUE when "Present" button is clicked', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    const { getByTestId, getByRole } = render(
      <Form
        validator={validator}
        schema={{
          type: 'object',
          properties: {
            dateRangeField: {
              type: 'object',
              properties: {
                start: { type: 'string' },
                end: { type: 'string' },
              },
            },
          },
        }}
        uiSchema={{
          dateRangeField: {
            'ui:field': 'daterange',
            'ui:options': {
              format: 'dd/mm/yyyy',
              outputFormat: 'yyyy-MM-dd',
              showPresentOption: true,
            },
          },
        }}
        formData={{
          dateRangeField: {
            start: '2024-01-15',
            end: '2024-12-31',
          },
        }}
        onChange={mockOnChange}
      />,
    );

    const calendarButton = getByTestId('daterangepicker-button');
    await user.click(calendarButton);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const presentButton = getByTestId('daterangepicker-present-button');
    await user.click(presentButton);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          dateRangeField: {
            start: '2024-01-15',
            end: PRESENT_VALUE,
          },
        }),
      );
    });
  });

  describe('accordion field', () => {
    const accordionFormSchema: RJSFSchema = {
      type: 'object',
      properties: {
        sectionA: {
          type: 'object',
          title: 'Section A',
          properties: {
            name: { type: 'string', title: 'Name' },
          },
        },
        sectionB: {
          type: 'object',
          title: 'Section B',
          properties: {
            value: { type: 'string', title: 'Value' },
          },
        },
      },
    };

    function renderFormWithAccordions(uiSchema: Record<string, unknown>) {
      return render(
        <AccordionGroupContextProvider>
          <Form
            validator={validator}
            schema={accordionFormSchema}
            uiSchema={uiSchema}
          />
        </AccordionGroupContextProvider>,
      );
    }

    it('renders accordion closed by default when collapsed: true', () => {
      renderFormWithAccordions({
        sectionA: {
          'ui:field': 'accordion',
          'ui:options': { targetField: 'ObjectField', collapsed: true },
        },
        sectionB: {
          'ui:field': 'accordion',
          'ui:options': { targetField: 'ObjectField', collapsed: true },
        },
      });

      const titles = screen.getAllByTestId('accordion-title');
      expect(titles).toHaveLength(2);
      titles.forEach((el) => {
        expect(el).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('renders accordion open by default when collapsed: false', () => {
      renderFormWithAccordions({
        sectionA: {
          'ui:field': 'accordion',
          'ui:options': { targetField: 'ObjectField', collapsed: false },
        },
        sectionB: {
          'ui:field': 'accordion',
          'ui:options': { targetField: 'ObjectField', collapsed: false },
        },
      });

      const titles = screen.getAllByTestId('accordion-title');
      expect(titles).toHaveLength(2);
      titles.forEach((el) => {
        expect(el).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('toggles accordion open and closed on click', async () => {
      const user = userEvent.setup();
      renderFormWithAccordions({
        sectionA: {
          'ui:field': 'accordion',
          'ui:options': { targetField: 'ObjectField', collapsed: false },
        },
        sectionB: {
          'ui:field': 'accordion',
          'ui:options': { targetField: 'ObjectField', collapsed: true },
        },
      });

      const titles = screen.getAllByTestId('accordion-title');
      const [sectionATitle, sectionBTitle] = titles;

      expect(sectionATitle).toHaveAttribute('aria-expanded', 'true');
      expect(sectionBTitle).toHaveAttribute('aria-expanded', 'false');

      await user.click(sectionATitle);
      expect(sectionATitle).toHaveAttribute('aria-expanded', 'false');

      await user.click(sectionATitle);
      expect(sectionATitle).toHaveAttribute('aria-expanded', 'true');

      await user.click(sectionBTitle);
      expect(sectionBTitle).toHaveAttribute('aria-expanded', 'true');

      await user.click(sectionBTitle);
      expect(sectionBTitle).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
