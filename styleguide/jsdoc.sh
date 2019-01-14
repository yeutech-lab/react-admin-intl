#!/usr/bin/env bash
set -e

npm run jsdoc-documentation 'src/createI18nProvider.js' docs/js/createI18nProvider.md
npm run jsdoc-documentation 'src/swapPolyglotWithReactIntl.js' docs/js/swapPolyglotWithReactIntl.md
