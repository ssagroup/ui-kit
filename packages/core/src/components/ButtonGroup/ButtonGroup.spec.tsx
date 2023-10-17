import { ButtonGroup } from './ButtonGroup';

const items = [
  { id: 1, text: 'All (10)' },
  { id: 2, text: 'Running (117)' },
  { id: 3, text: 'Stopped (2)' },
];

describe('ButtonGroup', () => {
  it('Renders with text', () => {
    render(<ButtonGroup items={items} onClick={(item) => item} />);
  });
});
