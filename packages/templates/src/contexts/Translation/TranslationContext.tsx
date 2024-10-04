import { createContext, ReactNode, useContext, useState } from 'react';
import { pathOr } from '@ssa-ui-kit/utils';
import { config as translationConfig } from './config';
import { TranslationContextContent } from './types';
import { JSONObject } from '../../types';

export const TranslationContext = createContext<TranslationContextContent>({
  language: translationConfig.defaultLanguage,
  t() {
    return '';
  },
  setLanguage() {
    /* no-op */
  },
  setTranslations() {
    /* no-op */
  },
});

export const TranslationProvider = ({
  children,
  defaultTranslations = {},
}: {
  children: ReactNode;
  defaultTranslations?: JSONObject;
}) => {
  const [language, setLanguage] = useState<string>(
    translationConfig.defaultLanguage,
  );
  const [translations, setTranslations] =
    useState<JSONObject>(defaultTranslations);
  const t = (translationKey: string) => {
    const translationKeyArray = translationKey.split('.');
    const translation = pathOr<JSONObject, string>(translationKey, [
      language,
      ...translationKeyArray,
    ])(translations);
    return translation;
  };
  return (
    <TranslationContext.Provider
      value={{
        language,
        t,
        setLanguage,
        setTranslations,
      }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
