import createI18nProvider from '../createI18nProvider';
import en from './en';
import fr from './fr';


describe('createI18nProvider', () => {
  let locale;
  let locales;
  let enMessages;
  let frMessages;

  beforeAll(() => {
    locale = 'en';
    locales = ['en', 'fr'];
    enMessages = en;
    frMessages = fr;
  });

  it('should create a i18nProvider', () => {
    const i18nProvider = createI18nProvider({
      locale,
      locales,
      defaultMessages: () => require(`./${locale}`), // eslint-disable-line global-require
      deferredMessagesList: locales.map((deferred) => () => import(`./${deferred}`)),
    });
    expect(i18nProvider('en')).toEqual(enMessages);
  });

  it('should create a i18nProvider using object on defaultMessages option', () => {
    const i18nProvider = createI18nProvider({
      locale,
      locales,
      defaultMessages: require(`./${locale}`), // eslint-disable-line global-require
      deferredMessagesList: locales.map((deferred) => () => import(`./${deferred}`)),
    });
    expect(i18nProvider('en')).toEqual(enMessages);
  });


  it('should create a i18nProvider and retrieve async language', async () => {
    const i18nProvider = createI18nProvider({
      locale,
      locales,
      defaultMessages: require(`./${locale}`), // eslint-disable-line global-require
      deferredMessagesList: locales.map((deferred) => () => import(`./${deferred}`)),
    });
    expect(await i18nProvider('fr')).toEqual(frMessages);
  });
});
