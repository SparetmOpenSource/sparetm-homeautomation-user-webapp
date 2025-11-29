import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/User/UserSlice';
import deviceReducer from '../Features/Device/DeviceSlice';
import roomReducer from '../Features/Room/RoomSlice';
import blinkReducer from '../Features/Blink/BlinkSlice';
import notificationReducer from '../Features/Notification/NotificationSlice';

import { ADMIN_GLOBAL, PROFILE_GLOBAL, PROFILEID_GLOBAL, TOKEN_GLOBAL } from '../Data/Constants';
import {

} from '../Data/Constants';
import {
    addAdmin,
    removeAdmin,
    addProfile,
    removeProfile,
    addToken,
    removeToken,
    addProfileId,
    removeProfileId,
} from './User/UserSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        device: deviceReducer,
        room: roomReducer,
        blink: blinkReducer,
        notification: notificationReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware.concat(logger),
});

// Subscribe to store changes to persist user state
store.subscribe(() => {
    const state = store.getState().user;
    const { admin, profile, token, profileId } = state;

    // Helper to set or remove item only if localStorage value is different
    const updateStorage = (key: string, value: any) => {
        const currentStorageValue = localStorage.getItem(key);
        
        // Determine what the new storage value should be (null for empty values)
        const shouldStore = value && value !== '';
        const newStorageValue = shouldStore ? JSON.stringify(value) : null;
        
        // Only update if different from what's already in localStorage
        if (currentStorageValue === newStorageValue) return;
        
        if (newStorageValue !== null) {
            localStorage.setItem(key, newStorageValue);
        } else {
            localStorage.removeItem(key);
        }
    };

    updateStorage(ADMIN_GLOBAL, admin);
    updateStorage(PROFILE_GLOBAL, profile);
    updateStorage(TOKEN_GLOBAL, token);
    updateStorage(PROFILEID_GLOBAL, profileId);
    

});


// Listen for storage events to sync across tabs
window.addEventListener('storage', (e) => {
    if (e.storageArea === localStorage) {
        const { key, newValue } = e;
        
        const state = store.getState().user;

        
        // Helper to dispatch action only if Redux state is different
        const dispatchUpdate = (
            currentValue: any,
            addAction: any,
            removeAction: any
        ) => {
            // Parse the new value from JSON (localStorage now stores JSON strings)
            let parsedNewValue = '';
            try {
                if (newValue && newValue !== 'null') {
                    parsedNewValue = JSON.parse(newValue);
                }
            } catch (error) {
                console.warn(`Error parsing localStorage value for key "${key}":`, error);
                parsedNewValue = '';
            }
            
            // Normalize values for comparison
            const normalizedCurrent = currentValue || '';
            const normalizedNew = parsedNewValue || '';
            
            // Only dispatch if the Redux state is different from localStorage
            if (normalizedCurrent === normalizedNew) return;
            
            if (parsedNewValue && parsedNewValue !== '') {
                store.dispatch(addAction(parsedNewValue));
            } else {
                store.dispatch(removeAction());
            }
        };
        


        switch (key) {
            case ADMIN_GLOBAL:
                dispatchUpdate(state.admin, addAdmin, removeAdmin);
                break;
            case PROFILE_GLOBAL:
                dispatchUpdate(state.profile, addProfile, removeProfile);
                break;
            case TOKEN_GLOBAL:
                dispatchUpdate(state.token, addToken, removeToken);
                break;
            case PROFILEID_GLOBAL:
                dispatchUpdate(state.profileId, addProfileId, removeProfileId);
                break;
            // Spotify cases

        }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
