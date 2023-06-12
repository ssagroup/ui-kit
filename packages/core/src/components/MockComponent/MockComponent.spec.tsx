import { render as _render, RenderOptions } from '@testing-library/react';
// TODO: probably, we need to remove this afterwards
import renderer from 'react-test-renderer';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const MockComponentBase = styled.div`
  color: purple;
`;

const MockComponent = ({
  sayHi,
  className,
}: {
  sayHi: string;
  className?: string;
}) => {
  return <MockComponentBase className={className}>{sayHi}</MockComponentBase>;
};

describe('MockComponent', () => {
  it.only('should render', () => {
    const { debug } = _render(
      <MockComponent sayHi="Hi!" css={{ fontSize: '10px' }} />,
    );
    debug();

    const el = document.querySelector('div');
    expect(el).toBeInTheDocument();
    console.log(
      'color:',
      window.getComputedStyle(el as HTMLDivElement).getPropertyValue('color'),

      window.getComputedStyle(el as HTMLDivElement).color,
    );
    debugger;
    expect(el).toHaveStyleRule('fontSize', '10px');
    expect(el).toHaveStyleRule('color', 'purple');
  });

  it('this test works', () => {
    const tree = renderer
      .create(<MockComponent sayHi="Hi!" css={{ fontSize: '10px' }} />)
      .toJSON();

    // https://github.com/styled-components/jest-styled-components/issues/294
    expect(tree).toHaveStyleRule('color', 'purple');
  });
});
