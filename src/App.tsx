import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route } from 'react-router-dom';

import RootContainer from './containers/RootContainer/RootContainer';

import store, { persistor } from './config/store';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Route path="/" component={RootContainer} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
