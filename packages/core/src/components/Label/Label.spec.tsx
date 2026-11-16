import userEvent from '@testing-library/user-event';
import styled from '@emotion/styled';
import { screen } from '../../../customTest';

import Label from '@components/Label';

describe('Label', () => {
  it('Render input with label and helper text', () => {
    const name = 'field';
    const label = 'Label';

    render(<Label htmlFor={`formElement-${name}`}>{label}</Label>);

    const labelEl = screen.getByText(/label/i);

    expect(labelEl).toHaveAttribute('for', 'formElement-field');
    expect(labelEl).toBeInTheDocument();
  });

  it('Renders with custom styles', () => {
    const label = 'Label';
    const CustomLabel = styled(Label)`
      background-color: blue;
    `;
    render(<CustomLabel htmlFor="elementId">{label}</CustomLabel>);

    const labelEl = screen.getByText(/label/i);

    expect(labelEl).toHaveAttribute('for', 'elementId');
    expect(labelEl).toHaveStyleRule('background-color', 'blue');
  });

  it('Reacts to mouse events (enter, leave)', async () => {
    const user = userEvent.setup();
    const mockOnMouseEnter = jest.fn();
    const mockOnMouseLeave = jest.fn();

    const { getByText } = render(
      <Label
        htmlFor="formElement"
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}>
        Label
      </Label>,
    );

    const labelEl = getByText(/label/i);

    await user.hover(labelEl);
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
    expect(mockOnMouseLeave).not.toHaveBeenCalled();

    await user.unhover(labelEl);
    expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);
    expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
  });
});

describe('Label badge', () => {
  it('renders the badge next to the label, outside its accessible name', () => {
    render(
      <>
        <Label htmlFor="email" badge={{ text: 'mapped', color: 'primary' }}>
          Email
        </Label>
        <input id="email" />
      </>,
    );

    const badge = screen.getByText('mapped').closest('[id]');
    expect(badge).toHaveAttribute('id', 'email-badge');
    expect(screen.getByText('Email').contains(badge)).toBe(false);
    expect(screen.getByRole('textbox')).toHaveAccessibleName('Email');
  });

  it('takes an explicit badge id and generates one without htmlFor', () => {
    const { rerender } = render(
      <Label badge={{ text: 'default', id: 'custom' }}>Recruiter</Label>,
    );
    expect(screen.getByText('default').closest('[id]')).toHaveAttribute(
      'id',
      'custom',
    );

    rerender(<Label badge={{ text: 'default' }}>Recruiter</Label>);
    expect(screen.getByText('default').closest('[id]')?.id).toMatch(/-badge$/);
  });

  it('renders no wrapper without a badge', () => {
    const { container } = render(<Label htmlFor="x">Plain</Label>);

    expect(container.firstElementChild?.tagName).toBe('LABEL');
  });
});

describe('Label required', () => {
  it('renders a decorative * after the text, outside the accessible name', () => {
    render(
      <>
        <Label htmlFor="email" required>
          Email
        </Label>
        <input id="email" />
      </>,
    );

    const mark = screen.getByTestId('label-required-mark');
    expect(mark).toHaveTextContent('*');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Email')).toContainElement(mark);
    expect(screen.getByRole('textbox')).toHaveAccessibleName('Email');
  });

  it('colours the * with the error palette and a 2px gap', () => {
    render(<Label required>Email</Label>);

    const mark = screen.getByTestId('label-required-mark');
    expect(mark).toHaveStyleRule('color', 'rgb(222, 79, 79)');
    expect(mark).toHaveStyleRule('margin-left', '2px');
  });

  it('greys the * out with a disabled label', () => {
    render(
      <Label required disabled>
        Email
      </Label>,
    );

    expect(screen.getByTestId('label-required-mark')).not.toHaveStyleRule(
      'color',
      'rgb(222, 79, 79)',
    );
  });

  it('renders no * by default', () => {
    render(<Label>Email</Label>);

    expect(screen.queryByTestId('label-required-mark')).toBeNull();
  });

  it('keeps the * inside the label next to a badge', () => {
    render(
      <Label htmlFor="email" required badge={{ text: 'mapped' }}>
        Email
      </Label>,
    );

    expect(screen.getByText('Email')).toContainElement(
      screen.getByTestId('label-required-mark'),
    );
    expect(screen.getByText('mapped')).toBeInTheDocument();
  });
});
