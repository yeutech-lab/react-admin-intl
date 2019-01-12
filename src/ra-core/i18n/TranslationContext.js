import { createContext } from 'react';

export const TranslationContext = createContext({
  locale: 'en',
  translate: (id) => id,
});
