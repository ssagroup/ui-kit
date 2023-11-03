import { useState } from 'react';
import { ExchangeAccountKeys } from '../ExchangeAccountKeys';
import { getMockData } from '../helpers';

interface onDelete {
  onDelete: () => void;
}

export const StoryComponent = ({ onDelete }: onDelete) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  const handleClickVisible = (isVisible: boolean) => {
    if (isVisible) {
      setIsDisabled(true);
      getMockData().then((data) => {
        setSecretKey(data);
        setIsDisabled(false);
      });
    } else {
      setSecretKey('******');
    }
  };

  return (
    <ExchangeAccountKeys
      title="Account Name"
      apiKey="123456789012345678901234567890"
      secretKey={secretKey}
      onDelete={onDelete}
      onVisibilityChange={handleClickVisible}
      isDisabled={isDisabled}
    />
  );
};
