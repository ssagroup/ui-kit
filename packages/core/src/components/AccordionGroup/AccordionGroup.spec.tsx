import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

import { AccordionGroupContextProvider } from './AccordionContext';
import { AccordionSize } from './types';
import { AccordionTemplate } from './stories/helpers';

interface AccordionTest {
  id: string;
  ariaControls: string;
  title: string;
  text: string;
  opened: boolean;
}

interface ComponentAccordionTests {
  (
    describeBlockName: string,
    size: AccordionSize,
    getAccordionText: (accordion: AccordionTest) => string,
  ): void;
}

const ACCORDIONS_COUNT = 3;
const accordions: Array<AccordionTest> = [
  {
    id: 'first',
    ariaControls: 'first-panel',
    title: 'Basic',
    opened: false,
    text: 'BasicCarrot upLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, dui in commodo porttitor, neque metus lobortis sem, at suscipit arcu ligula non enim.',
  },
  {
    id: 'second',
    ariaControls: 'second-panel',
    title: 'Advanced',
    opened: true,
    text: 'AdvancedCarrot downLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, dui in commodo porttitor, neque metus lobortis sem, at suscipit arcu ligula non enim.',
  },
  {
    id: 'third',
    ariaControls: 'third-panel',
    title: 'Indicator',
    opened: false,
    text: 'BasicCarrot upLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend, dui in commodo porttitor, neque metus lobortis sem, at suscipit arcu ligula non enim.',
  },
];

const componentAccordionTests: ComponentAccordionTests = (
  describeBlockName,
  size,
  getAccordionText,
) => {
  const checkAccordionPanel = (
    accordion: AccordionTest,
    accordionEl: HTMLElement,
  ) => {
    expect(accordionEl).toHaveAttribute('id', accordion.id);
    expect(accordionEl).toHaveAttribute(
      'aria-controls',
      accordion.ariaControls,
    );
    expect(accordionEl).toHaveTextContent(
      accordion.text.replace('BasicCarrot up', 'BasicCarrot down') || '',
    );
  };

  describe(describeBlockName, () => {
    function setup() {
      return {
        user: userEvent.setup(),
        ...render(
          <AccordionGroupContextProvider>
            <AccordionTemplate size={size} />
          </AccordionGroupContextProvider>,
        ),
      };
    }

    it('Renders AccordionGroup', () => {
      const { getByRole } = setup();
      const accordionListElement = getByRole('tablist');
      const accordionEls =
        within(accordionListElement).getAllByRole('accordion');

      expect(accordionEls.length).toBe(ACCORDIONS_COUNT);
      expect(screen.getAllByRole('tabpanel').length).toBe(ACCORDIONS_COUNT);

      for (let i = 0; i < accordions.length - 1; ++i) {
        const accordion = accordions[i];
        const accordionEl = accordionEls[i];

        expect(accordionEl).toHaveAttribute('id', accordion.id);
        expect(accordionEl).toHaveAttribute(
          'aria-selected',
          `${accordion.opened}`,
        );
        expect(accordionEl).toHaveAttribute('tabindex', '0');
        expect(accordionEl).toHaveAttribute(
          'aria-controls',
          accordion.ariaControls,
        );

        const textContents = getAccordionText(accordion);

        expect(accordionEl).toHaveTextContent(textContents);
        expect(accordionEl.getAttribute('title')).toEqual(accordion.title);
      }
    });

    it("Marks an accordion as active when it's clicked", async () => {
      const { user } = setup();
      const accordionListElement = screen.getByRole('tablist');
      const chapterTitle = accordionListElement.querySelectorAll('h3');

      await user.click(chapterTitle[0]);
      await user.click(chapterTitle[1]);

      const accordionEls =
        within(accordionListElement).getAllByRole('accordion');

      for (let i = 0; i < accordions.length; ++i) {
        const accordion = accordions[i];
        const accordionEl = accordionEls[i];

        if (i === 0) {
          expect(accordionEl).toHaveAttribute('aria-selected', 'true');

          checkAccordionPanel(accordion, accordionEl);
        } else {
          expect(accordionEl).toHaveAttribute('aria-selected', 'false');
        }

        expect(accordionEl).toHaveAttribute('id', accordion.id);
        expect(accordionEl).toHaveAttribute('tabindex', '0');
        expect(accordionEl).toHaveAttribute(
          'aria-controls',
          accordions[i].ariaControls,
        );
        expect(accordionEl.getAttribute('title')).toEqual(accordion.title);
      }
    });
  });
};

describe('AccordionGroup', () => {
  componentAccordionTests('Large', 'large', (accordion) => accordion.text);
  componentAccordionTests('Medium', 'medium', (accordion) => accordion.text);
  componentAccordionTests('Small', 'small', (accordion) => accordion.text);
  componentAccordionTests('Empty', 'empty', (accordion) => accordion.text);
});
