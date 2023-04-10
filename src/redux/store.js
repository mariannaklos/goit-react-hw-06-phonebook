import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { mySliceAddContacts } from './Slice';
import { mySliceFilter } from './Slice';

const rootReducer = combineReducers({
  contacts: mySliceAddContacts.reducer,
  filter: mySliceFilter.reducer,
});

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedReducerAdd = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducerAdd,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
