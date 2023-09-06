import theme from '@themes/main';
import { outlineStyles } from './safari-focus-outline';
import styled from '@emotion/styled';

describe('Style', () => {
  it('outlineStyles', () => {
    const Component = styled.button`
      ${outlineStyles(theme)}
    `;

    const { getByRole } = render(<Component />);
    const button = getByRole('button');

    expect(button).toHaveStyleRule('border-width', `1px`);
    expect(button).toHaveStyleRule('border-style', `solid`);
    expect(button).toHaveStyleRule(
      'border-color',
      `${theme.colors['greyDarker']}`,
    );
  });
});
