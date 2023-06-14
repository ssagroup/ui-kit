import { screen } from '../../../customTest';
import Bmi from './index';

describe('BMI', () => {
  it('Render BMI with default values', () => {
    render(<Bmi />);

    const calculation = screen.queryByRole('heading', { name: /21.6/i });
    const info = screen.queryByRole('heading', { name: /you're healthy/i });
    const pointer = screen.queryByTestId('bmi-pointer');

    expect(calculation).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(pointer).toHaveStyle('left: 40%;');
  });

  it('BMI status healthy', () => {
    render(<Bmi height={180} weight={66} />);

    const calculation = screen.queryByRole('heading', { name: /20.4/i });
    const info = screen.queryByRole('heading', { name: /you're healthy/i });
    const pointer = screen.queryByTestId('bmi-pointer');

    expect(calculation).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(pointer).toHaveStyle('left: 40%;');
  });

  it('BMI status under weight', () => {
    render(<Bmi height={175} weight={46} />);

    const calculation = screen.queryByRole('heading', { name: /18.5/ });
    const info = screen.queryByRole('heading', {
      name: /you're under weight/i,
    });
    const pointer = screen.queryByTestId('bmi-pointer');

    expect(calculation).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(pointer).toHaveStyle('left: 10%;');
  });

  it('BMI status overweight', () => {
    render(<Bmi height={175} weight={86} />);

    const calculation = screen.queryByRole('heading', { name: /28.1/i });
    const info = screen.queryByRole('heading', {
      name: /you're overweight/i,
    });
    const pointer = screen.queryByTestId('bmi-pointer');

    expect(calculation).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(pointer).toHaveStyle('left: 70%;');
  });

  it('BMI status obese', () => {
    render(<Bmi height={175} weight={106} />);

    const calculation = screen.queryByRole('heading', { name: /34.6/i });
    const info = screen.queryByRole('heading', { name: /you're obese/i });
    const pointer = screen.queryByTestId('bmi-pointer');

    expect(calculation).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(pointer).toHaveStyle('left: 90%;');
  });
});
