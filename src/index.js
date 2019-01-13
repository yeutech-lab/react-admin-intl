/* eslint-disable no-param-reassign */
/**
 * @public
 * @name swapPolyglotWithReactIntl
 * @description Swap polyglot with our react-intl adapter
 * @param {object} webpackConfig - Your application webpack configuration
 * @example
 * const swapPolyglotWithReactIntl = require('@yeutech-lab/react-admin-intl');
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
