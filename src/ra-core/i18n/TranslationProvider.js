import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultMessages from '@yeutech-lab/ra-language-intl';
import Polyglot from 'node-polyglot';
import defaultsDeep from 'lodash/defaultsDeep';
import { TranslationContext } from './TranslationContext';

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
class TranslationProviderView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { locale, messages } = props;
    const polyglot = new Polyglot({
      locale,
      phrases: defaultsDeep({}, messages, defaultMessages),
    });

    this.state = {
      contextValues: {
        locale,
        translate: polyglot.t.bind(polyglot),
      },
    };
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.locale !== this.props.locale) {
      const { locale, messages } = this.props;

      const polyglot = new Polyglot({
        locale,
        phrases: defaultsDeep({}, messages, defaultMessages),
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        contextValues: {
          locale,
          translate: polyglot.t.bind(polyglot),
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
}

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
  messages: state.i18n.messages,
});

const TranslationProvider = connect(mapStateToProps)(TranslationProviderView);

export default TranslationProvider;

// /*
//  *
//  * TranslationProvider
//  *
//  * this component connects the redux state language locale to the
//  * IntlProvider component and i18n messages (loaded from `app/translations`)
//  */
//
// import React, { Children } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { injectIntl, IntlProvider } from 'react-intl';
// import { compose, withContext } from 'recompose';
// import defaultMessages from '@yeutech-lab/ra-language-intl/translation/en.json';
//
// const TranslationProviderTranslateContext = props =>
//     Children.only(props.children);
//
// const withI18nContext = withContext(
//     {
//         translate: PropTypes.func.isRequired,
//     },
//     ({ intl, messages }) => {
//         return {
//             translate: (id, opts) =>
//                 console.log(id) || intl.formatMessage({ id, defaultMessage: messages[id] }, opts),
//         };
//     }
// );
//
// const ConnectedTranslationProvider = compose(injectIntl, withI18nContext)(
//     TranslationProviderTranslateContext
// );
//
// export const TranslationProvider = props => (
//     <IntlProvider
//         locale={props.locale}
//         messages={props.messages || defaultMessages}
//     >
//         <ConnectedTranslationProvider
//             messages={props.messages || defaultMessages}
//         >
//             {props.children}
//         </ConnectedTranslationProvider>
//     </IntlProvider>
// );
//
// TranslationProvider.propTypes = {
//     locale: PropTypes.string.isRequired,
//     messages: PropTypes.object,
//     children: PropTypes.element.isRequired,
// };
//
// const mapStateToProps = state => ({
//     locale: state.i18n.locale,
//     messages: state.i18n.messages,
// });
//
// const withI18nContextTranslationProvider = withContext(
//     {
//         locale: PropTypes.string.isRequired,
//     },
//     ({ locale }) => {
//         return {
//             locale,
//         };
//     }
// );
//
// export default compose(
//     connect(mapStateToProps),
//     withI18nContextTranslationProvider
// )(TranslationProvider);
