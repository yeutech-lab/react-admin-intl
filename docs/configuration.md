We tweaked two sources from [ra-core](https://github.com/marmelab/react-admin/tree/master/packages/ra-core/src).

These sources can be used instead of the original one to support internationalization with [react-intl](https://github.com/yahoo/react-intl/).

There is two way to configure:

1. Module bundler configuration
1. Transpiler configuration

You only need to configure at one place

## Module bundler configuration

You can use this with webpack, rollup, or any module bundler.

Configuring alias at the module bundler level is often provided and is good if you are not distributing a module that import aliased source within it.

### Webpack

You must add to your `resolve.alias` two entries.

This can be done when configuring webpack using one of our utility:

```js static
const swapPolyglotWithReactIntl = require('$PACKAGE_NAME/lib/swapPolyglotWithReactIntl');
// add aliases
webpackConfig = swapPolyglotWithReactIntl(webpackConfig);
```

If you prefer to do it manually, basically it will do this:


```js static
config.resolve.alias['./i18n/TranslationProvider'] = '$PACKAGE_NAME/lib/ra-core/i18n/TranslationProvider';
config.resolve.alias['./TranslationContext']  = '$PACKAGE_NAME/lib/ra-core/i18n/TranslationContext';
```

## Transpiler configuration

Configuring at the transpiler level is efficient, because the transpiled code does not depend on any module bundler to work. The transpiled source include modified aliases.

### Babel

You can use [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver#readme) to configure babel aliases.
