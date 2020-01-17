import React from 'react';
import { enableScreens } from 'react-native-screens';
import Router from './src/common/router';
import NavigationService from './src/common/navigationService';
import Store from './src/common/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

enableScreens();
const App = () => {
    return (
      <Provider store={Store.store} >
      <PersistGate persistor={Store.persistor} >
          <Router
              ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
              }}
          />
      </PersistGate>
  </Provider >
    );
  };


export default App;
