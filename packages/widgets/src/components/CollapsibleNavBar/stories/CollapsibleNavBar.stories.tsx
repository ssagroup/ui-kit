import { Fragment } from 'react';
import styled from '@emotion/styled';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { Title, Description, Source } from '@storybook/addon-docs';

import { DecoratorFunction } from '@storybook/types';
import { CollapsibleNavBar } from '../CollapsibleNavBar';
import { ITEMS } from './consts';
import { Logo } from './Logo';

type Args = Parameters<typeof CollapsibleNavBar>[0];

const Main = styled.main`
  background: linear-gradient(
      143deg,
      #e7ebf1 -4.16%,
      #d7d9dd 39.37%,
      #cccdd2 52.66%,
      #e1e4ea 87.68%
    ),
    #f8f9fb;
  width: 100%;
  padding: 60px 0 0 15px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 21px 0 35px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 49px 0 36px;
  }

  ${({ theme }) => theme.mediaQueries.xlg} {
    padding: 0 60px 0 62px;
  }
`;

const reactRouterDecorator: DecoratorFunction<
  {
    component: typeof CollapsibleNavBar;
    storyResult: React.ReactElement;
    canvasElement: unknown;
  },
  Args
> = (Story) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

export default {
  title: 'Widgets/CollapsibleNavBar',
  component: CollapsibleNavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <Fragment>
          <Title />
          <Description />
          <Source code={`<CollapsibleNavBar />`} />
        </Fragment>
      ),
    },
  },
  decorators: [
    reactRouterDecorator,
    (Story) => (
      <div
        css={{
          display: 'flex',
          minHeight: '100vh',
        }}>
        {/*<div css={{ backgroundColor: '#ccc' }}>123</div> */}
        {Story()}
        <Main>
          {new Array(200).fill(1).map((_, index) => (
            <button
              key={index}
              onClick={() => alert('click' + (index + 1))}
              css={{ display: 'block' }}>
              {index + 1}
            </button>
          ))}
        </Main>
      </div>
    ),
  ],
  args: {
    items: ITEMS,
    renderLogo: <Logo />,
  },
} as Meta<typeof CollapsibleNavBar>;

export const Default = {};
