import { fireEvent } from '@testing-library/dom';
import { StoryComponent } from './stories/StoryComponent';
import { act } from '@testing-library/react';

describe('Popover', () => {
  it('Shows up when the trigger is clicked', () => {
    const { getByText, getByRole, queryByText } = render(<StoryComponent />);

    const buttonEl = getByRole('button');
    let closeButtonEl = queryByText('Close');
    expect(closeButtonEl).not.toBeInTheDocument();
    act(() => {
      fireEvent.click(buttonEl);
    });
    closeButtonEl = getByText('Close');
    expect(closeButtonEl).toBeInTheDocument();
    act(() => {
      if (closeButtonEl) {
        fireEvent.click(closeButtonEl);
      }
    });
    expect(queryByText('Close')).not.toBeInTheDocument();
  });
});
