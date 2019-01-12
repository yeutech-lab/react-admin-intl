import swapPolyglotWithReactIntl from '../index';
const exported = require('../index');

describe('exported', () => {
  Object.keys(exported).forEach((key) => {
    it(`${key} should be defined`, () => {
      expect(exported[key]).toBeDefined();
    });
  });

  it('swapPolyglotWithReactIntl should add aliases', () => {
    let webpackConfig = {};
    webpackConfig = swapPolyglotWithReactIntl(webpackConfig);
    expect(webpackConfig.resolve.alias).toBeDefined();
    expect(Object.keys(webpackConfig.resolve.alias).length).toBeGreaterThanOrEqual(2);
    webpackConfig = { alias: {} };
    webpackConfig = swapPolyglotWithReactIntl(webpackConfig);
    expect(Object.keys(webpackConfig.resolve.alias).length).toBeGreaterThanOrEqual(2);
  });
});
