import React from 'react';
import { shallow, mount } from 'enzyme';
import { FormattedMessage, defineMessages } from 'react-intl';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TranslationProvider from '../TranslationProvider';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  let store;
  let initialState;
  let reducer;
  let locale;

  beforeAll(() => {
    initialState = {
      i18n: {
        locale: 'en',
        messages: {
          'some.id': 'This is some default message',
        },
      },
    };
    reducer = (state = {}, { type, payload }) => {
      if (type === 'RA/CHANGE_LOCALE') {
        state.locale = payload; // eslint-disable-line no-param-reassign
        return state;
      }
      return state;
    };
    store = createStore(reducer, initialState);
    locale = 'en';
  });

  it('should render the default language messages', () => {
    const renderedComponent = shallow(
      <Provider store={store}>
        <TranslationProvider locale={locale} messages={messages}>
          <FormattedMessage {...messages.someMessage} />
        </TranslationProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toBe(true);
  });

  /* eslint-disable react/prop-types, no-shadow */
  it('should mount the default language messages', () => {
    function Test({ store, messages: messagesProps, locale }) {
      return (
        <Provider store={store}>
          <TranslationProvider locale={locale} messages={messagesProps}>
            <FormattedMessage {...messages.someMessage} />
          </TranslationProvider>
        </Provider>
      );
    }

    const renderedComponent = mount(
      <Test store={store} messages={messages} locale={locale} />
    );
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toBe(true);
    renderedComponent.setProps({
      locale: 'fr',
      messages: {
        'some.id': 'Ceci est un message par default',
      },
    });
    renderedComponent.update();
    expect(renderedComponent.find('Connect(TranslationProvider)').prop('locale')).toEqual('fr');
  });
});
