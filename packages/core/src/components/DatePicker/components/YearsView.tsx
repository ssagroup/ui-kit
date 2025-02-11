import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { useDatePickerContext } from '../useDatePickerContext';
import { getYearsList } from '../utils';

export const YearsView = () => {
  const { setCalendarType } = useDatePickerContext();
  const yearsList = getYearsList();
  const handleClick = () => {
    setCalendarType('months');
  };
  // TODO: one click handler
  return (
    <Wrapper>
      {yearsList.map((year) => (
        <span key={`year-${year}`}>-{year}-</span>
      ))}
      Years view <Button onClick={handleClick}>Change to Months view</Button>
    </Wrapper>
  );
};
