import { useEffect, useState } from 'react';
import { ExchangeAccountKeys } from '../ExchangeAccountKeys';
import { getMockData } from '../helpers';

interface onDelete {
  onDelete: () => void;
}

export const StoryComponent = ({ onDelete }: onDelete) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    if (isVisible) {
      setIsDisabled(true);
      getMockData().then((data) => {
        setSecretKey(data);
        setIsDisabled(false);
      });
    }
    setSecretKey('');
  }, [isVisible]);

  return (
    <ExchangeAccountKeys
      title="Account Name"
      apiKey="123456789012345678901234567890"
      secretKey={secretKey}
      onDelete={onDelete}
      onVisibilityChange={() => setIsVisible((prev) => !prev)}
      isDisabled={isDisabled}
    />
  );
};
