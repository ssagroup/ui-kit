import theme from '@themes/main';
import { outlineStyles } from './safari-focus-outline';
import styled from '@emotion/styled';

describe('Style', () => {
  it('outlineStyles', () => {
    const Component = styled.button`
      ${outlineStyles(theme)}
    `;

    const { getByRole } = render(<Component />);

    expect(getByRole('button')).toHaveStyleRule(
      'border',
      `1px solid ${theme.colors['greyDarker']}`,
    );
  });
});
