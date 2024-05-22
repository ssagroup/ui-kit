import { useContext } from 'react';
import { render } from '@testing-library/react';
import { PaginationContext } from '@ssa-ui-kit/widgets';
import { WithPagination } from '.';

jest.mock('d3-color', () => ({}));

const TestComponent = () => {
  const { page } = useContext(PaginationContext);
  return <p>{page}</p>;
};

const TestComponentWithPagination = WithPagination(TestComponent);

describe('HOC: withPagination', () => {
  it('HOC rendered successfully', () => {
    // TODO: find out by "p" tag and check inside text
    const { getByText } = render(<TestComponentWithPagination />);
    expect(getByText('1'));
  });
});
