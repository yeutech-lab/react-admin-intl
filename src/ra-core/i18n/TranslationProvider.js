import React, { Children, Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, injectIntl } from 'react-intl';
import { TranslationContext } from './TranslationContext';
/* eslint-disable react/prop-types, react/destructuring-assignment, react/no-did-update-set-state */

/**
 * Creates a translation context, available to its children
 *
 * Must be called withing a Redux app.
 *
 * @example
 *     const MyApp = () => (
 *         <Provider store={store}>
 *             <TranslationProvider locale="fr" messages={messages}>
 *                 <!-- Child components go here -->
 *             </TranslationProvider>
 *         </Provider>
 *     );
 */
const TranslationProviderIntl = injectIntl(class TranslationProviderView extends Component {
  constructor(props) {
    super(props);
    const { locale, messages, intl } = props;

    this.state = {
      contextValues: {
        locale,
        translate: (id, opts) => id ? intl.formatMessage({ id, defaultMessage: messages[id] }, opts) : '',
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locale !== this.props.locale) {
      const { locale, messages, intl } = this.props;

      this.setState({
        contextValues: {
          locale,
          translate: (id, opts) => id ? intl.formatMessage({ id, defaultMessage: messages[id] }, opts) : '',
        },
      });
    }
  }

  render() {
    const { children } = this.props;
    const { contextValues } = this.state;

    return (
      <TranslationContext.Provider value={contextValues}>
        {Children.only(children)}
      </TranslationContext.Provider>
    );
  }
});

function TranslationProvider({ locale, messages, ...rest }) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <TranslationProviderIntl locale={locale} messages={messages} {...rest} />
    </IntlProvider>
  );
}

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
  messages: state.i18n.messages,
});

export default connect(mapStateToProps)(TranslationProvider);
