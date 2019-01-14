import { addLocaleData } from 'react-intl';

/**
 * @public
 * @name createI18nProvider
 * @description Create a i18nProvider used for retrieving translation messages.
 * The i18nProvider is a function that accept a `locale` as a parameter, it return:
 *
 * - a messages `object` directly for the default `locale`
 * - an unresolved `Promise` that is fetching the message object for the `locale`
 *
 * This permit to do application code splitting on language, and load new language only if the user change locale.
 *
 * Ideally, you create a i18n folder in the `src` folder of your project and had all the languages here.
 *
 * ````bash
 * src/i18n
 *      ├── de.js
 *      ├── en.js
 *      ├── fr.js
 *      ├── i18nProvider.js
 *      ├── index.js
 *      ├── translation
 *      │   ├── de.json
 *      │   ├── en.json
 *      │   ├── fr.json
 *      │   └── vi.json
 *      └── vi.js
 * ````
 *
 * The `i18n/index.js` file export the default application locale and the list of applications locales
 *
 * @param {Object} options - createI18nProvider options
 * @param {string} [default=en] options.locale - Default application locale ISO3166 alpha 2 (See: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
 * @param {string} [default=['en']] options.locales - List of application locales available ISO3166
 * @param {function|object} [default={}] options.defaultMessages - A function or an object which return messages from `require(locale)`
 * @param {Promise[]} [default=[]] options.deferredMessagesList - A map from `locales`, return a function that return messages from `import(locale)`
 * @example
 * import createI18nProvider from '@yeutech-lab/react-admin-intl';
 * import { appLocales as locales, DEFAULT_LOCALE as locale } from './index';
 *
 * // this will create the i18nProvider
 * const { i18nProvider, messages } = createI18nProvider({
 *   locale,
 *   locales,
 *   // this must be a function, otherwise webpack does not support dynamic import
 *   defaultMessages: () => require(`./${locale}`),
 *   deferredMessagesList: locales.map((l) => () => import(`./${l}`))
 * });
 * @returns {i18nProvider}
 *
 */
export default function createI18nProvider({
  locale = 'en',
  locales = ['en'],
  defaultMessages = () => {},
  deferredMessagesList = [],
}) {
  const formatTranslationMessages = (currentLocale, messages) => {
    const defaultFormattedMessages = currentLocale !== locale
      ? formatTranslationMessages(locale, currentLocale)
      : {};
    return Object.keys(messages).reduce((formattedMessages, key) => {
      const formattedMessage = !messages[key] && currentLocale !== locale
        ? defaultFormattedMessages[key]
        : messages[key];
      return Object.assign(formattedMessages, { [key]: formattedMessage });
    }, {});
  };
  const messages = {};
  locales.forEach((cursorLocale, i) => {
    addLocaleData(require(`react-intl/locale-data/${cursorLocale}`)); // eslint-disable-line global-require
    if (cursorLocale !== locale) {
      messages[cursorLocale] = () => deferredMessagesList[i]()
        .then((deferredMessages) => formatTranslationMessages(cursorLocale, deferredMessages.default));
    } else {
      const defaultMsgs = typeof defaultMessages === 'function' ? defaultMessages() : defaultMessages;
      messages[cursorLocale] = formatTranslationMessages(cursorLocale, defaultMsgs.default);
    }
  });

  return (selectedLocale) => {
    if (selectedLocale !== locale) {
      return messages[selectedLocale]();
    }
    return messages[selectedLocale];
  };
}
