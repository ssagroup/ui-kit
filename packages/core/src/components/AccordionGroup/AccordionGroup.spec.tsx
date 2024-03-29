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
    expect(accordionEl).toHaveTextContent('BasicCarrot down');
  };

  describe(describeBlockName, () => {
    function setup(params: Parameters<typeof AccordionTemplate>[0] = {}) {
      return {
        user: userEvent.setup(),
        ...render(
          <AccordionGroupContextProvider>
            <AccordionTemplate size={size} {...params} />
          </AccordionGroupContextProvider>,
        ),
      };
    }

    it('Renders AccordionGroup', () => {
      const { getByTestId } = setup();
      const accordionListElement = getByTestId('accordion-group');
      const accordionEls = within(accordionListElement).getAllByRole('region');

      expect(accordionEls.length).toBe(ACCORDIONS_COUNT);
      expect(screen.getAllByRole('region').length).toBe(ACCORDIONS_COUNT);

      for (let i = 0; i < accordions.length - 1; ++i) {
        const accordion = accordions[i];
        const accordionGroupEl = accordionEls[i];
        const accordionTitleEl = within(accordionEls[i]).getByTestId(
          'accordion-title',
        );

        expect(accordionTitleEl).toHaveAttribute('id', accordion.id);
        expect(accordionTitleEl).toHaveAttribute(
          'aria-expanded',
          `${accordion.opened}`,
        );
        expect(accordionGroupEl).toHaveAttribute('tabindex', '0');
        expect(accordionTitleEl).toHaveAttribute(
          'aria-controls',
          accordion.ariaControls,
        );

        const textContents = getAccordionText(accordion);

        expect(accordionGroupEl).toHaveTextContent(textContents);
        expect(accordionGroupEl.querySelector('button')).toHaveTextContent(
          accordion.title,
        );
      }
    });

    it("Marks an accordion #1 as active and accordion #2 as inactive when they're clicked [accordionStayOpen = true]", async () => {
      const { user } = setup();
      let accordionListElement = screen.getByTestId('accordion-group');
      const chapterTitle = accordionListElement.querySelectorAll('button');

      await user.click(chapterTitle[0]);
      await user.click(chapterTitle[1]);

      accordionListElement = screen.getByTestId('accordion-group');
      const accordionEls = within(accordionListElement).getAllByRole('region');

      for (let i = 0; i < accordions.length; ++i) {
        const accordion = accordions[i];
        const accordionGroupEl = accordionEls[i];
        const accordionTitleEl = within(accordionEls[i]).getByTestId(
          'accordion-title',
        );

        if (i === 0) {
          expect(accordionTitleEl).toHaveAttribute('aria-expanded', 'true');

          checkAccordionPanel(accordion, accordionTitleEl);
        } else {
          expect(accordionTitleEl).toHaveAttribute('aria-expanded', 'false');
        }

        expect(accordionTitleEl).toHaveAttribute('id', accordion.id);
        expect(accordionGroupEl).toHaveAttribute('tabindex', '0');
        expect(accordionTitleEl).toHaveAttribute(
          'aria-controls',
          accordions[i].ariaControls,
        );
        expect(accordionGroupEl.querySelector('button')).toHaveTextContent(
          accordion.title,
        );
      }
    });

    it('Marks an accordion #1 as active and accordion #2 as inactive when clicked on accordion #1 [accordionStayOpen = false]', async () => {
      const { user } = setup({ accordionsStayOpen: false });
      const accordionListElement = screen.getByTestId('accordion-group');
      const chapterTitle = accordionListElement.querySelectorAll('button');

      await user.click(chapterTitle[0]);

      const accordionEls = within(accordionListElement).getAllByRole('region');

      for (let i = 0; i < accordions.length; ++i) {
        const accordion = accordions[i];
        const accordionGroupEl = accordionEls[i];
        const accordionTitleEl = within(accordionEls[i]).getByTestId(
          'accordion-title',
        );

        if (i === 0) {
          expect(accordionTitleEl).toHaveAttribute('aria-expanded', 'true');

          checkAccordionPanel(accordion, accordionTitleEl);
        } else {
          expect(accordionTitleEl).toHaveAttribute('aria-expanded', 'false');
        }

        expect(accordionTitleEl).toHaveAttribute('id', accordion.id);
        expect(accordionGroupEl).toHaveAttribute('tabindex', '0');
        expect(accordionTitleEl).toHaveAttribute(
          'aria-controls',
          accordions[i].ariaControls,
        );
        expect(accordionTitleEl.textContent).toEqual(
          `${accordion.title}Carrot ${i === 0 ? 'down' : 'up'}`,
        );
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
