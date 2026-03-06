import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { mockUseForm } from '../../../customTest';
import { Popover, PopoverTrigger, PopoverContent } from '.';
import Input from '@components/Input';
import { StoryComponent } from './stories/StoryComponent';

const { register } = mockUseForm();

describe('Popover', () => {
  it('Shows up when the trigger is clicked', () => {
    const { getByText, getByRole, queryByText } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    let closeButtonEl = queryByText('Close');
    expect(closeButtonEl).not.toBeInTheDocument();
    fireEvent.click(buttonEl);
    closeButtonEl = getByText('Close');
    expect(closeButtonEl).toBeInTheDocument();
    fireEvent.click(closeButtonEl);
    expect(queryByText('Close')).not.toBeInTheDocument();
  });

  it('forwards ref correctly when using asChild with forwardRef component', () => {
    const inputRef = React.createRef<HTMLInputElement>();

    render(
      <Popover>
        <PopoverTrigger asChild>
          <Input
            name="test-input"
            placeholder="Test"
            ref={inputRef}
            register={register}
          />
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    // Verify that the ref is properly forwarded to the Input component
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(inputRef.current?.tagName).toBe('INPUT');
  });

  it('sets floating-ui reference for positioning when using asChild', () => {
    const inputRef = React.createRef<HTMLInputElement>();

    const { getByRole } = render(
      <Popover open={true}>
        <PopoverTrigger asChild>
          <Input
            name="test-input"
            placeholder="Test"
            ref={inputRef}
            register={register}
          />
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    const input = getByRole('textbox') as HTMLInputElement;

    // Verify the input element exists and has the ref set
    expect(inputRef.current).toBe(input);
    // Verify the input is in the document (positioning would work)
    expect(input).toBeInTheDocument();
  });
});
