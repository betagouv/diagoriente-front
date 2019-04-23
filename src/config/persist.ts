
import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




const REDUX_PERSIST: PersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  blacklist: [],
};

export default REDUX_PERSIST;
