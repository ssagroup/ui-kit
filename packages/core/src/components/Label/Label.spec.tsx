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
