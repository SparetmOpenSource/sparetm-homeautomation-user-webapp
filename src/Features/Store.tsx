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

import userReducer from '../Features/User/UserSlice';
import deviceReducer from '../Features/Device/DeviceSlice';
import roomReducer from '../Features/Room/RoomSlice';
import blinkReducer from '../Features/Blink/BlinkSlice';
import notificationReducer from '../Features/Notification/NotificationSlice';

const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer,
    room: roomReducer,
    blink: blinkReducer,
    notification: notificationReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user'], // FAANG Standard: Only persist the essential user session slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
