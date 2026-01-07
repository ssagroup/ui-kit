import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { getByRole } from '@testing-library/dom';

import Tab from '@components/Tab';
import LargeTab from '@components/LargeTab';

import { TabBarWrapper, TabContents } from './stories/helpers';
import TabBar, { TabBarContextProvider } from './index';
import { SmallTabProps, TabProps } from './types';
import { ReactNode } from 'react';

interface TabTest extends Pick<SmallTabProps, 'tabId'> {
  controls: string;
  topText?: string;
  bottomText?: string;
  text?: string;
  renderContent: (
    tab?: {
      tabId: number | string;
      text: string;
      renderContent: () => ReactNode;
      [prop: string | number | symbol]: unknown;
    },
    arg?: unknown,
  ) => React.ReactNode;
}

interface ComponentTabBarTests {
  (
    describeBlockName: string,
    tabs: TabTest[],
    renderTab: (tab: TabTest) => React.ReactElement<TabProps>,
    getTabText: (tab: TabTest) => string[],
  ): void;
}

const componentTabBarTests: ComponentTabBarTests = (
  describeBlockName,
  tabs,
  renderTab,
  getTabText,
) => {
  const checkTabPanel = (tab: TabTest, container: HTMLElement) => {
    const tabPanel = getByRole(container, 'tabpanel');

    expect(tabPanel).toHaveAttribute('id', tab.controls);
    expect(tabPanel).toHaveAttribute('aria-labelledby', tab.tabId);
    expect(tabPanel).toHaveTextContent(tab.topText || tab.text || '');
  };

  describe(describeBlockName, () => {
    function setup() {
      return {
        user: userEvent.setup(),
        ...render(
          <TabBarContextProvider>
            <TabBarWrapper>
              <TabBar>{tabs.map((t) => renderTab(t))}</TabBar>
            </TabBarWrapper>
          </TabBarContextProvider>,
        ),
      };
    }

    it('Renders tabs', () => {
      const { getByRole, queryByRole } = setup();
      const tabBarEl = getByRole('tablist');
      const tabEls = within(tabBarEl).getAllByRole('tab');

      expect(tabEls.length).toBe(tabs.length);
      expect(queryByRole('tabpanel')).not.toBeInTheDocument();

      for (let i = 0; i < tabs.length; ++i) {
        const tab = tabs[i];
        const tabEl = tabEls[i];

        expect(tabEl).toHaveAttribute('id', tab.tabId);
        expect(tabEl).toHaveAttribute('aria-selected', 'false');
        expect(tabEl).toHaveAttribute('tabindex', '0');
        expect(tabEl).toHaveAttribute('aria-controls', tabs[i].controls);

        const textContents = getTabText(tab);

        for (const t of textContents) {
          expect(tabEl).toHaveTextContent(t);
          expect(tabEl.getAttribute('title')).toEqual(expect.stringMatching(t));
        }
      }
    });

    it("Marks a tab as active when it's clicked", async () => {
      const { user, getByRole, container } = setup();
      const tabBarEl = getByRole('tablist');
      const tabEls = within(tabBarEl).getAllByRole('tab');

      await user.click(tabEls[0]);

      for (let i = 0; i < tabs.length; ++i) {
        const tab = tabs[i];
        const tabEl = tabEls[i];

        if (i === 0) {
          expect(tabEl).toHaveAttribute('aria-selected', 'true');

          checkTabPanel(tab, container);
        } else {
          expect(tabEl).toHaveAttribute('aria-selected', 'false');
        }

        expect(tabEl).toHaveAttribute('id', tab.tabId);
        expect(tabEl).toHaveAttribute('tabindex', '0');
        expect(tabEl).toHaveAttribute('aria-controls', tabs[i].controls);
        const textContents = getTabText(tab);

        for (const t of textContents) {
          expect(tabEl).toHaveTextContent(t);
          expect(tabEl.getAttribute('title')).toEqual(expect.stringMatching(t));
        }
      }
    });

    it('Marks a tab as inactive when another tab is clicked', async () => {
      const { user, getByRole, container } = setup();
      const tabBarEl = getByRole('tablist');
      const tabEls = within(tabBarEl).getAllByRole('tab');

      await user.click(tabEls[0]);
      await user.click(tabEls[1]);

      for (let i = 0; i < tabs.length; ++i) {
        const tab = tabs[i];
        const tabEl = tabEls[i];

        if (i === 1) {
          expect(tabEl).toHaveAttribute('aria-selected', 'true');

          checkTabPanel(tab, container);
        } else {
          expect(tabEl).toHaveAttribute('aria-selected', 'false');
        }

        expect(tabEl).toHaveAttribute('id', tab.tabId);
        expect(tabEl).toHaveAttribute('tabindex', '0');
        expect(tabEl).toHaveAttribute('aria-controls', tabs[i].controls);
        const textContents = getTabText(tab);

        for (const t of textContents) {
          expect(tabEl).toHaveTextContent(t);
          expect(tabEl.getAttribute('title')).toEqual(expect.stringMatching(t));
        }
      }
    });

    it("Does not toggle an active element when it's clicked", async () => {
      const { user, getByRole, container } = setup();
      const tabBarEl = getByRole('tablist');
      const tabEls = within(tabBarEl).getAllByRole('tab');

      await user.click(tabEls[0]);
      await user.click(tabEls[0]);

      for (let i = 0; i < tabs.length; ++i) {
        const tabEl = tabEls[i];

        if (i === 0) {
          expect(tabEl).toHaveAttribute('aria-selected', 'true');

          checkTabPanel(tabs[i], container);
        } else {
          expect(tabEl).toHaveAttribute('aria-selected', 'false');
        }
      }
    });

    it('Becomes focused when TAB is clicked', async () => {
      const { user, getByRole } = setup();

      const tabBarEl = getByRole('tablist');
      const tabEls = within(tabBarEl).getAllByRole('tab');

      await user.keyboard('[Tab]');

      expect(tabEls[0]).toHaveFocus();
    });
  });
};

describe('TabBar', () => {
  const renderContent = (tab?: SmallTabProps): React.ReactNode => {
    return (
      <TabContents
        id={tab?.ariaControls}
        labelledBy={tab?.tabId as string}
        text={`${tab?.topText || tab?.text} contents`}
      />
    );
  };

  componentTabBarTests(
    'Time Period Tab Bar',
    [
      {
        tabId: 'year',
        text: 'Year',
        controls: 'panel-1',
        renderContent,
      },
      { tabId: 'month', text: 'Month', controls: 'panel-2', renderContent },
      { tabId: 'week', text: 'Week', controls: 'panel-3', renderContent },
      { tabId: 'day', text: 'Day', controls: 'panel-4', renderContent },
    ],
    (tab) => (
      <Tab
        key={tab.tabId}
        tabId={tab.tabId}
        text={tab.text || ''}
        ariaControls={tab.controls}
        renderContent={tab.renderContent as TabProps['renderContent']}
      />
    ),
    (tab) => [tab.text || ''],
  );

  componentTabBarTests(
    'Week Tab Bar',
    [
      {
        tabId: 'monday',
        topText: 'Mon',
        bottomText: '02',
        controls: 'panel-1',
        renderContent,
      },
      {
        tabId: 'tuesday',
        topText: 'Tue',
        bottomText: '03',
        controls: 'panel-2',
        renderContent,
      },
      {
        tabId: 'wednesday',
        topText: 'Wed',
        bottomText: '04',
        controls: 'panel-3',
        renderContent,
      },
      {
        tabId: 'thursday',
        topText: 'Thu',
        bottomText: '05',
        controls: 'panel-4',
        renderContent,
      },
      {
        tabId: 'friday',
        topText: 'Fri',
        bottomText: '06',
        controls: 'panel-5',
        renderContent,
      },
      {
        tabId: 'Saturday',
        topText: 'Sat',
        bottomText: '07',
        controls: 'panel-6',
        renderContent,
      },
      {
        tabId: 'Sunday',
        topText: 'Sun',
        bottomText: '08',
        controls: 'panel-7',
        renderContent,
      },
    ],
    (tab) => (
      <LargeTab
        key={tab.tabId}
        tabId={tab.tabId}
        topText={tab.topText || ''}
        bottomText={tab.bottomText || ''}
        ariaControls={tab.controls}
        renderContent={tab.renderContent as TabProps['renderContent']}
      />
    ),
    (tab) => [tab.topText || '', tab.bottomText || ''],
  );
});
