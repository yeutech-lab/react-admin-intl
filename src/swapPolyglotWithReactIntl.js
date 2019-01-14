/* eslint-disable no-param-reassign */
/**
 * @public
 * @name swapPolyglotWithReactIntl
 * @description Swap polyglot with our react-intl adapter
 *
 * This will replace the internationalization of react-admin (It use [polyglot](http://airbnb.io/polyglot.js/)).
 * Instead, it will use [react-intl](https://github.com/yahoo/react-intl)
 * Because of that, default messages provided by **react-admin** won't be compatible anymore.
 * This is why you must use this package to import the **react-intl** version of messages:
 *
 * ```bash
 * $ npm install @yeutech-lab/ra-language-intl --save
 * ```
 * Visit [ra-language-intl](https://github.com/yeutech-lab/ra-language-intl) documentation to view available or add locale(s) translation(s).
 *
 * @param {object} webpackConfig - Your application webpack configuration
 * @example
 * const swapPolyglotWithReactIntl = require('@yeutech-lab/react-admin-intl/lib/swapPolyglotWithReactIntl');
 *
 * // later in your application when you create your webpack configuration
 * webpackConfig = swapPolyglotWithReactIntl(webpackConfig);
 *
 * @return {object} webpackConfig - The edited webpack config
 */
export default function swapPolyglotWithReactIntl(webpackConfig) {
  if (!webpackConfig.resolve) {
    webpackConfig.resolve = { alias: {} };
  } else if (!webpackConfig.resolve.alias) {
    webpackConfig.resolve.alias = {};
  }
  webpackConfig.resolve.alias['./i18n/TranslationProvider'] = '@yeutech-lab/react-admin-intl/lib/ra-core/i18n/TranslationProvider';
  webpackConfig.resolve.alias['./TranslationContext'] = '@yeutech-lab/react-admin-intl/lib/ra-core/i18n/TranslationContext';
  return webpackConfig;
}
