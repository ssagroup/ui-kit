import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import { useDatePickerContext } from '../useDatePickerContext';

export const YearsView = () => {
  const { setCalendarType } = useDatePickerContext();
  const handleClick = () => {
    setCalendarType('months');
  };
  return (
    <Wrapper>
      Years view <Button onClick={handleClick}>Change to Months view</Button>
    </Wrapper>
  );
};
