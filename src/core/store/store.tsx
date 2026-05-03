import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import deviceReducer from '../../features/devices/store/device/deviceslice';
import roomReducer from '../../features/devices/store/room/roomslice';
import blinkReducer from '../../features/notifications/store/blink/blinkslice';
import notificationReducer from '../../features/notifications/store/notification/notificationslice';
import userReducer from '../../features/profile/store/user/userslice';

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
