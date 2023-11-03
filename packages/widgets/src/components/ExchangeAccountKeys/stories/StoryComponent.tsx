import { useEffect, useState } from 'react';
import { ExchangeAccountKeys } from '../ExchangeAccountKeys';
import { getMockData } from '../helpers';

interface onDelete {
  onDelete: () => void;
}

export const StoryComponent = ({ onDelete }: onDelete) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      getMockData().then((data) => {
        setSecretKey(data);
        setIsLoading(false);
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
      onVisible={() => setIsVisible((prev) => !prev)}
      isLoading={isLoading}
    />
  );
};
