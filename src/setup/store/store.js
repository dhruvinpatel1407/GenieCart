import reducer from "./reducers/reducer";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Middleware for handling async actions
import { persistStore, persistReducer } from 'redux-persist'; // To persist the Redux state
import storage from 'redux-persist/lib/storage'; // Local storage as the persistence engine

// Configuring Redux Persist with the storage mechanism (localStorage)
const persistConfig = {
  key: 'root',  // The key for storing the state in local storage
  storage,      // Local storage is used for persistence
};

// Creating a persisted reducer to keep the state in sync with local storage
const persistedReducer = persistReducer(persistConfig, reducer);

// Creating the Redux store with the persisted reducer and middleware (thunk for async actions)
export const store = createStore(
  persistedReducer,          // Reducer with persistence
  applyMiddleware(thunk)      // Apply the redux-thunk middleware for async actions
);

// Persistor to manage and rehydrate the store from the persisted state
export const persistor = persistStore(store);
