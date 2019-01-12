import React, {
  createElement,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import withContext from 'recompose/withContext';
import createAdminStore from 'ra-core/lib/createAdminStore';
import CoreAdminRouter from 'ra-core/lib/CoreAdminRouter';
import TranslationProvider from './i18n/TranslationProvider';

/* eslint-disable react/prop-types, no-console */
class CoreAdmin extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };

  reduxIsAlreadyInitialized = false;

  history = null;

  constructor(props, context) {
    super(props, context);
    if (context.store) {
      this.reduxIsAlreadyInitialized = true;
      if (!props.history) {
        throw new Error(`Missing history prop.
When integrating react-admin inside an existing redux Provider, you must provide the same 'history' prop to the <Admin> as the one used to bootstrap your routerMiddleware.
React-admin uses this history for its own ConnectedRouter.`);
      }
      this.history = props.history;
    } else {
      if (!props.dataProvider) {
        throw new Error(`Missing dataProvider prop.
React-admin requires a valid dataProvider function to work.`);
      }
      this.history = props.history || createHistory();
    }
  }

  renderCore() {
    const {
      appLayout,
      authProvider,
      children,
      customRoutes = [],
      dashboard,
      menu, // deprecated, use a custom layout instead
      catchAll,
      theme,
      title = 'React Admin',
      loading,
      loginPage,
      logoutButton,
    } = this.props;

    const logout = authProvider ? createElement(logoutButton) : null;

    if (loginPage === true && process.env.NODE_ENV !== 'production') {
      console.warn(
        'You passed true to the loginPage prop. You must either pass false to disable it or a component class to customize it'
      );
    }

    return (
      <TranslationProvider>
        <ConnectedRouter history={this.history}>
          <Switch>
            {loginPage !== false ? (
              <Route
                exact
                path="/login"
                render={(props) => createElement(loginPage, {
                  ...props,
                  title,
                  theme,
                })
                }
              />
            ) : null}
            <Route
              path="/"
              render={(props) => (
                <CoreAdminRouter
                  appLayout={appLayout}
                  catchAll={catchAll}
                  customRoutes={customRoutes}
                  dashboard={dashboard}
                  loading={loading}
                  loginPage={loginPage}
                  logout={logout}
                  menu={menu}
                  theme={theme}
                  title={title}
                  {...props}
                >
                  {children}
                </CoreAdminRouter>
              )}
            />
          </Switch>
        </ConnectedRouter>
      </TranslationProvider>
    );
  }

  render() {
    const {
      authProvider,
      customReducers,
      customSagas,
      dataProvider,
      i18nProvider,
      initialState,
      locale,
    } = this.props;

    return this.reduxIsAlreadyInitialized ? (
      this.renderCore()
    ) : (
      <Provider
        store={createAdminStore({
          authProvider,
          customReducers,
          customSagas,
          dataProvider,
          i18nProvider,
          initialState,
          locale,
          history: this.history,
        })}
      >
        {this.renderCore()}
      </Provider>
    );
  }
}

export default withContext(
  {
    authProvider: PropTypes.func,
  },
  ({ authProvider }) => ({ authProvider })
)(CoreAdmin);

/* eslint-disable no-tabs */
//
// import React, { createElement } from 'react';
// import PropTypes from 'prop-types';
//
// import { createStore, compose, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import createHistory from 'history/createHashHistory';
// import { Switch, Route } from 'react-router-dom';
// import { routerMiddleware } from 'react-router-redux';
// import { ConnectedRouter } from 'connected-react-router';
// import createSagaMiddleware from 'redux-saga';
// import { all, fork } from 'redux-saga/effects';
// import withContext from 'recompose/withContext';
//
// import { USER_LOGOUT } from 'ra-core/lib/actions/authActions';
// import createAppReducer from 'ra-core/lib/reducer';
// import { adminSaga } from 'ra-core/lib/sideEffect';
// import CoreAdminRouter from 'ra-core/lib/CoreAdminRouter';
// import { defaultI18nProvider } from 'ra-core/lib/i18n';
// import ConnectedBootstrapProvider from '@bootstrap-styled/redux/lib/ConnectedBootstrapProvider';
// import TranslationProvider from './i18n/TranslationProvider';
//
//
// const CoreAdmin = ({
// 										 appLayout,
// 										 authProvider,
// 										 children,
// 										 customReducers = {},
// 										 customSagas = [],
// 										 customRoutes = [],
// 										 dashboard,
// 										 history,
// 										 menu,
// 										 catchAll,
// 										 dataProvider,
// 										 i18nProvider = defaultI18nProvider,
// 										 theme,
// 										 title = 'React Admin',
// 										 loading,
// 										 loginPage,
// 										 logoutButton,
// 										 initialState,
// 										 pages,
// 										 locale = 'en',
// 									 }) => {
//   const messages = i18nProvider(locale);
//   const appReducer = createAppReducer(customReducers, locale, messages);
//
//   const resettableAppReducer = (state, action) => appReducer(action.type !== USER_LOGOUT ? state : undefined, action);
//   const saga = function* rootSaga() {
//     yield all(
//       [
//         adminSaga(dataProvider, authProvider, i18nProvider),
//         ...customSagas,
//       ].map(fork)
//     );
//   };
//   const sagaMiddleware = createSagaMiddleware();
//   const routerHistory = history || createHistory();
//   const store = createStore(
//     resettableAppReducer,
//     initialState,
//     compose(
//       applyMiddleware(sagaMiddleware, routerMiddleware(routerHistory)),
//       typeof window !== 'undefined' && window.devToolsExtension
//         ? window.devToolsExtension()
//         : (f) => f
//     )
//   );
//   sagaMiddleware.run(saga);
//   const logout = authProvider ? createElement(logoutButton) : null;
//   return (
//     <Provider store={store}>
//       <ConnectedBootstrapProvider reset injectGlobal>
//         <TranslationProvider>
//           <ConnectedRouter history={routerHistory}>
//             <Switch>
//               {loginPage !== false && (
//                 <Route
//                   exact
//                   path="/login"
//                   render={(props) => createElement(loginPage, {
//                     ...props,
//                     title,
//                   })}
//                 />
//               )}
//               <Route
//                 path="/"
//                 render={(props) => (
//                   <CoreAdminRouter
//                     appLayout={appLayout}
//                     catchAll={catchAll}
//                     customRoutes={customRoutes}
//                     dashboard={dashboard}
//                     loading={loading}
//                     loginPage={loginPage}
//                     logout={logout}
//                     menu={menu}
//                     theme={theme}
//                     title={title}
//                     pages={pages}
//                     {...props}
//                   >
//                     {children}
//                   </CoreAdminRouter>
//                 )}
//               />
//             </Switch>
//           </ConnectedRouter>
//         </TranslationProvider>
//       </ConnectedBootstrapProvider>
//     </Provider>
//   );
// };
//
// const componentPropType = PropTypes.oneOfType([
//   PropTypes.func,
//   PropTypes.string,
// ]);
//
// CoreAdmin.propTypes = {
//   appLayout: componentPropType,
//   authProvider: PropTypes.func,
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
//   catchAll: componentPropType,
//   customSagas: PropTypes.array,
//   customReducers: PropTypes.object,
//   customRoutes: PropTypes.array,
//   dashboard: componentPropType,
//   dataProvider: PropTypes.func.isRequired,
//   history: PropTypes.object,
//   i18nProvider: PropTypes.func,
//   initialState: PropTypes.object,
//   loading: componentPropType,
//   locale: PropTypes.string,
//   loginPage: componentPropType,
//   logoutButton: componentPropType,
//   menu: componentPropType,
//   theme: PropTypes.object,
//   title: PropTypes.node,
//   pages: PropTypes.object,
// };
//
// export default withContext(
//   {
//     authProvider: PropTypes.func,
//   },
//   ({ authProvider }) => ({ authProvider })
// )(CoreAdmin);
