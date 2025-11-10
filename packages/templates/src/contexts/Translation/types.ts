import { Dispatch, SetStateAction } from 'react';

import { JSONObject } from '../../types';

export type TranslationContextContent = {
  language: string;
  t: (translationKey: string) => string;
  setLanguage: Dispatch<SetStateAction<string>>;
  setTranslations: Dispatch<SetStateAction<JSONObject>>;
};
