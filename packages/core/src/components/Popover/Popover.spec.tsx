import { fireEvent } from '@testing-library/dom';

import { StoryComponent } from './stories/StoryComponent';

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
});
