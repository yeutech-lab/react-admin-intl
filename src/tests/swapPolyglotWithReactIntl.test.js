import swapPolyglotWithReactIntl from '../swapPolyglotWithReactIntl';

describe('exported', () => {
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
