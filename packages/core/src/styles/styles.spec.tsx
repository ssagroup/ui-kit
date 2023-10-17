import theme from '@themes/main';
import { outlineStyles } from './safari-focus-outline';
import styled from '@emotion/styled';

describe('Styles', () => {
  describe('Outline', () => {
    it('Creates an outline with default styles', () => {
      const Component = styled.button`
        ${outlineStyles(theme)}
      `;

      const { getByRole } = render(<Component />);
      const button = getByRole('button');

      expect(button).toHaveStyleRule('border-width', `1px`);
      expect(button).toHaveStyleRule('border-style', `solid`);
      expect(button).toHaveStyleRule('border-radius', `12px`);
      expect(button).toHaveStyleRule(
        'border-color',
        `${theme.colors['greyDarker']}`,
      );
    });

    it('Creates an outline with custom styles', () => {
      const colorName = 'grey20';
      const Component = styled.button`
        ${outlineStyles(theme, colorName, '2px', 'dashed')}
      `;

      const { getByRole } = render(<Component />);
      const button = getByRole('button');

      expect(button).toHaveStyleRule('border-width', `1px`);
      expect(button).toHaveStyleRule('border-style', `dashed`);
      expect(button).toHaveStyleRule('border-radius', `2px`);
      expect(button).toHaveStyleRule(
        'border-color',
        `${theme.colors[colorName]}`,
      );
    });
  });
});
