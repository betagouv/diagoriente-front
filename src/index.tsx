import React from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';

// entry component
import App from './App';

import * as serviceWorker from './serviceWorker';

// styles entry point
import './styles/index.scss';

// localDataConfig
localforage.config({
  name: process.env.REACT_APP_LOCALFORAGE_NAME,
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: process.env.REACT_APP_LOCALFORAGE_STORE_NAME, // Should be alphanumeric, with underscores.
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
