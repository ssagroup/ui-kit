import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import { AccordionGroupContextProvider } from './AccordionContext';
import { AccordionVariant } from './types';
import { AccordionTemplate } from './stories/helpers';

interface AccordionTest {
  tabId: string;
  ariaControls: string;
  title: string;
  text: string;
  selected: boolean;
}

interface ComponentAccordionTests {
  (
    describeBlockName: string,
    variant: AccordionVariant,
    getTabText: (tab: AccordionTest) => string,
  ): void;
}

const ACCORDIONS_COUNT = 3;
const accordions: Array<AccordionTest> = [
  {
    tabId: 'first',
    ariaControls: 'first-panel',
    title: 'Basic',
    selected: false,
    text: 'BasicCarrot upLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, dui in commodo porttitor, neque metus lobortis sem, at suscipit arcu ligula non enim.',
  },
  {
    tabId: 'second',
    ariaControls: 'second-panel',
    title: 'Advanced',
    selected: true,
    text: 'AdvancedCarrot downLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, dui in commodo porttitor, neque metus lobortis sem, at suscipit arcu ligula non enim.',
  },
  {
    tabId: 'third',
    ariaControls: 'third-panel',
    title: 'Indicator',
    selected: false,
    text: 'BasicCarrot upLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, dui in commodo porttitor, neque metus lobortis sem, at suscipit arcu ligula non enim.',
  },
];

const componentAccordionTests: ComponentAccordionTests = (
  describeBlockName,
  variant,
  getTabText,
) => {
  const checkTabPanel = (tab: AccordionTest, tabEl: HTMLElement) => {
    expect(tabEl).toHaveAttribute('id', tab.tabId);
    expect(tabEl).toHaveAttribute('aria-controls', tab.ariaControls);
    expect(tabEl).toHaveTextContent(
      tab.text.replace('BasicCarrot up', 'BasicCarrot down') || '',
    );
  };

  describe(describeBlockName, () => {
    function setup() {
      return {
        user: userEvent.setup(),
        ...render(
          <AccordionGroupContextProvider>
            <AccordionTemplate variant={variant} />
          </AccordionGroupContextProvider>,
        ),
      };
    }

    it('Renders AccordionGroup', () => {
      const { getByRole } = setup();
      const accordionListElement = getByRole('tablist');
      const tabEls = within(accordionListElement).getAllByRole('tab');

      expect(tabEls.length).toBe(ACCORDIONS_COUNT);
      expect(screen.getAllByRole('tabpanel').length).toBe(ACCORDIONS_COUNT);

      for (let i = 0; i < accordions.length - 1; ++i) {
        const tab = accordions[i];
        const tabEl = tabEls[i];

        expect(tabEl).toHaveAttribute('id', tab.tabId);
        expect(tabEl).toHaveAttribute('aria-selected', `${tab.selected}`);
        expect(tabEl).toHaveAttribute('tabindex', '0');
        expect(tabEl).toHaveAttribute('aria-controls', tab.ariaControls);

        const textContents = getTabText(tab);

        expect(tabEl).toHaveTextContent(textContents);
        expect(tabEl.getAttribute('title')).toEqual(tab.title);
      }
    });

    it("Marks an accordion as active when it's clicked", async () => {
      const { user } = setup();
      const accordionListElement = screen.getByRole('tablist');
      const chapterTitle = accordionListElement.querySelectorAll('h3');

      await user.click(chapterTitle[0]);
      await user.click(chapterTitle[1]);

      const tabEls = within(accordionListElement).getAllByRole('tab');

      for (let i = 0; i < accordions.length; ++i) {
        const tab = accordions[i];
        const tabEl = tabEls[i];

        if (i === 0) {
          expect(tabEl).toHaveAttribute('aria-selected', 'true');

          checkTabPanel(tab, tabEl);
        } else {
          expect(tabEl).toHaveAttribute('aria-selected', 'false');
        }

        expect(tabEl).toHaveAttribute('id', tab.tabId);
        expect(tabEl).toHaveAttribute('tabindex', '0');
        expect(tabEl).toHaveAttribute(
          'aria-controls',
          accordions[i].ariaControls,
        );
        expect(tabEl.getAttribute('title')).toEqual(tab.title);
      }
    });
  });
};

describe('AccordionGroup', () => {
  componentAccordionTests('Large', 'large', (tab) => tab.text);
  componentAccordionTests('Medium', 'medium', (tab) => tab.text);
  componentAccordionTests('Small', 'small', (tab) => tab.text);
  componentAccordionTests('Empty', 'empty', (tab) => tab.text);
});
