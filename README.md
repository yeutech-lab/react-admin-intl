# react-admin-intl

[![Build Status](https://travis-ci.org/yeutech-lab/react-admin-intl.svg?branch=master)](https://travis-ci.org/yeutech-lab/react-admin-intl)
[![npm Version](https://img.shields.io/npm/v/@yeutech-lab/react-admin-intl.svg?style=flat)](https://www.npmjs.com/package/@yeutech-lab/react-admin-intl)
[![License](https://img.shields.io/npm/l/@yeutech-lab/react-admin-intl.svg?style=flat)](https://www.npmjs.com/package/@yeutech-lab/react-admin-intl)
[![NPM monthly downloads](https://img.shields.io/npm/dm/@yeutech-lab/react-admin-intl.svg?style=flat)](https://npmjs.org/package/@yeutech-lab/react-admin-intl)
[![NPM total downloads](https://img.shields.io/npm/dt/@yeutech-lab/react-admin-intl.svg?style=flat)](https://npmjs.org/package/@yeutech-lab/react-admin-intl)
[![npm Version](https://img.shields.io/node/v/@yeutech-lab/react-admin-intl.svg?style=flat)](https://www.npmjs.com/package/@yeutech-lab/react-admin-intl)
[![Module formats](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg?style=flat)](https://www.npmjs.com/package/@yeutech-lab/react-admin-intl)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=com.github.yeutech-lab.react-admin-intl&metric=coverage)](https://sonarcloud.io/dashboard?id=com.github.yeutech-lab.react-admin-intl) [![Quality gate status](https://sonarcloud.io/api/project_badges/measure?project=com.github.yeutech-lab.react-admin-intl&metric=alert_status)](https://sonarcloud.io/dashboard?id=com.github.yeutech-lab.react-admin-intl)


Quickly tweak react-admin and replace internationalization module polyglot with react-intl. It can work thanks to your resolve aliases babel or webpack configuration.


## Table of Contents

  - [Installation](#installation)
     - [Parameters](#parameters)
     - [Examples](#examples)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
  - [License MIT](#license-mit)

---

## Installation

```bash
$ npm install @yeutech-lab/react-admin-intl --save-dev
```

Swap polyglot with our react-intl adapter.

### Parameters

-   `webpackConfig` **[object][1]** Your application webpack configuration

### Examples

```javascript
const swapPolyglotWithReactIntl = require('@yeutech-lab/react-admin-intl');

// later in your application when you create your webpack configuration
webpackConfig = swapPolyglotWithReactIntl(webpackConfig);
```

Returns **[object][1]** webpackConfig - The edited webpack config

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

This will replace the internationalization of react-admin (It use [polyglot](http://airbnb.io/polyglot.js/)).

Instead, this will replace it with [react-intl](https://github.com/yahoo/react-intl)

Because of that, default messages provided by **react-admin** won't be compatible anymore.

This is why you must use this package to import the **react-intl** version of messages:


```bash
$ npm install @yeutech-lab/ra-language-intl --save
```

Visit [ra-language-intl](https://github.com/yeutech-lab/ra-language-intl) documentation to view available or add locale(s) translation(s).


## Documentation

Read [react-admin-intl documentation](https://yeutech-lab.github.io/react-admin-intl).

## Contributing

If you want to contribute to react-admin-intl please see our [contributing and community guidelines](https://github.com/yeutech-lab/react-admin-intl/blob/master/.github/CONTRIBUTING.md), they\'ll help you get set up locally and explain the whole process.

Please also note that all repositories under the yeutech-lab organization follow our [Code of Conduct](https://github.com/yeutech-lab/react-admin-intl/blob/master/CODE_OF_CONDUCT.md), make sure to review and follow it.

## License MIT

Copyright 2019 Yeutech Company Limited

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

