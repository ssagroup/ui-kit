import { screen } from '../../../customTest';
import Stepper from './index';

describe('Stepper', () => {
  // As we can't test the ::after pseudo element, we can check if the
  // CSS-in-JS class are diferent for done and not done
  it('Just one done and different classList', async () => {
    render(
      <Stepper
        steps={[
          {
            title: '1500ml',
            caption: 'item A',
            done: false,
          },
          {
            title: '500ml',
            caption: 'Item B',
            done: true,
          },
        ]}
      />,
    );

    const [itemA, itemB] = await screen.findAllByRole('listitem');

    const classListA = itemA.classList.toString();
    const classListB = itemB.classList.toString();

    expect(classListA).not.toEqual(classListB);
  });

  it('All done and with the same classList', async () => {
    render(
      <Stepper
        steps={[
          {
            title: '1500ml',
            caption: 'item A',
            done: true,
          },
          {
            title: '500ml',
            caption: 'Item B',
            done: true,
          },
        ]}
      />,
    );

    const [itemA, itemB] = await screen.findAllByRole('listitem');

    const classListA = itemA.classList.toString();
    const classListB = itemB.classList.toString();

    expect(classListA).toEqual(classListB);
  });
});
