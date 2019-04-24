import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const REDUX_PERSIST: PersistConfig = {
  storage,
  key: 'root',
  whitelist: ['parcours'],
  blacklist: [],
};

export default REDUX_PERSIST;
