import { TranslationContext } from '../TranslationContext';

describe('<TranslationContext />', () => {
  it('should be the TranslationContext', () => {
    expect(TranslationContext.Provider).toBeDefined();
    expect(TranslationContext.Consumer).toBeDefined();
  });
});
