import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import fullDetails from '../ducks/fullDetails';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import AsyncStorage from '@react-native-community/async-storage';
import thunkMiddleware from 'redux-thunk';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};
const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});
const rootReducer = combineReducers({
  fullDetails,
});
const store = createStore(
  persistReducer(rootPersistConfig, rootReducer),
  compose(
    applyMiddleware(
      // loggerMiddleware,
      thunkMiddleware,
    ),
  ),
);
const persistor = persistStore(store);
export default {store, persistor};
