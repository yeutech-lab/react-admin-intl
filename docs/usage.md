If you haven't read their documentation, you should read https://marmelab.com/react-admin/Translation.html


It will work as usual, except the `i18nProvider` used with `<Admin />` must be in react-intl format

```js static
import englishMessages from './en.js';

const asyncMessages = {
    fr: () => import('./i18n/fr.js').then(messages => messages.default),
    it: () => import('./i18n/it.js').then(messages => messages.default),
};

const i18nProvider = locale => {
    if (locale === 'en') {
        // initial call, must return synchronously
        return englishMessages;
    }
    // change of locale after initial call returns a promise
    return asyncMessages[params.locale]();
}

const App = () => (
    <Admin locale="en" i18nProvider={i18nProvider}>
        ...
    </Admin>
);
```

With `./en.js` that look like:

```js static
import raEnglishMessages from '@yeutech-lab/ra-language-intl/translation/en.json';

import appEnglishMessages from './translation/en.json';

export const messages = {
  ...raEnglishMessages,
  ...appEnglishMessages,
};

export default messages;
```
