The tested and officially supported version of [ra-core](https://www.npmjs.com/package/ra-core) is `v$PACKAGE_RA_CORE_VERSION`.

We tweaked a few sources from [ra-core](https://github.com/marmelab/react-admin/tree/v$PACKAGE_RA_CORE_VERSION/packages/ra-core/src).

These source can be used instead of the original one to support internationalization with [react-intl](https://github.com/yahoo/react-intl/).

There is two way to configure:

1. Module bundler configuration
1. Transpiler configuration

You only need to configure at one place

## Module bundler configuration

You can use this with webpack, rollup, or any module bundler.

Configuring alias at the module bundler level is often provided and is good if you are not distributing a module that import aliased source within it.

### Webpack

Add to `resolve.alias` configuration the following entries:

```js static
config.resolve.alias['./i18n/TranslationProvider'] = join('react-admin-intl/ra-core/i18n/TranslationProvider');
config.resolve.alias['./TranslationContext']  = join('react-admin-intl/ra-core/i18n/TranslationContext');
```

## Transpiler configuration

Configuring at the transpiler level is efficient, because the transpiled code does not depend on any module bundler to work. The transpiled source include modified aliases.

### Babel

You can use [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver#readme) to configure babel aliases.
