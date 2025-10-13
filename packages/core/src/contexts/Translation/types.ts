import { Dispatch, SetStateAction } from 'react';

import { JSONObject } from '@global-types/json';

export type TranslationContextContent = {
  language: string;
  t: (translationKey: string) => string;
  setLanguage: Dispatch<SetStateAction<string>>;
  setTranslations: Dispatch<SetStateAction<JSONObject>>;
};
