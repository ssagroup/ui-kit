import Wrapper from './Wrapper';

describe('Style', () => {
  it('outlineStyles', () => {
    const { getByText } = render(
      <Wrapper alignItems="baseline" direction="row">
        element
      </Wrapper>,
    );
    const el = getByText('element');

    expect(el).toHaveStyleRule('align-items', `baseline`);
    expect(el).toHaveStyleRule('flex-direction', `row`);
  });
});
