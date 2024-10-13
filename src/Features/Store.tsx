import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/User/UserSlice';
import deviceReducer from '../Features/Device/DeviceSlice';
import roomReducer from '../Features/Room/RoomSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        device: deviceReducer,
        room: roomReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware.concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
