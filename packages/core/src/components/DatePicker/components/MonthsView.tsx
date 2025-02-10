import Wrapper from '@components/Wrapper';
import Button from '@components/Button';
import { useDatePickerContext } from '../useDatePickerContext';

export const MonthsView = () => {
  const { setCalendarType } = useDatePickerContext();
  const handleClick = () => {
    setCalendarType('days');
  };
  return (
    <Wrapper>
      Months view <Button onClick={handleClick}>Change to Days view</Button>
    </Wrapper>
  );
};
