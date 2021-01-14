import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider,} from 'react-redux';
import productsReducer from './store/reducers/products';
import AppNavigator from './navigation/AppNavigator';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';



const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders:orderReducer,
  auth: authReducer
});

const store =createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
    <AppNavigator />
    </Provider>
  );
}
