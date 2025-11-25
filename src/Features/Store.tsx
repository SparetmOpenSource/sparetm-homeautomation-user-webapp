import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/User/UserSlice';
import deviceReducer from '../Features/Device/DeviceSlice';
import roomReducer from '../Features/Room/RoomSlice';
import blinkReducer from '../Features/Blink/BlinkSlice';
import spotifyReducer from '../Features/Spotify/SpotifySlice';
import { ADMIN, PROFILE, PROFILEID, TOKEN } from '../Data/Constants';
import {
    spotifyToken,
    spotifyRefreshToken,
    spotifyAccountType,
    spotifyTokenFetched,
    spotifyTokenFetchedTime,
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
import {
    setSpotifyAccessToken,
    setSpotifyRefreshToken,
    setSpotifyAccountType,
    setSpotifyTokenFetched,
    setSpotifyTokenFetchedTime,
    resetSpotify,
} from './Spotify/SpotifySlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        device: deviceReducer,
        room: roomReducer,
        blink: blinkReducer,
        spotify: spotifyReducer,
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

    updateStorage(`${ADMIN}_global`, admin);
    updateStorage(`${PROFILE}_global`, profile);
    updateStorage(`${TOKEN}_global`, token);
    updateStorage(`${PROFILEID}_global`, profileId);
    
    // Persist Spotify state
    const spotifyState = store.getState().spotify;
    updateStorage(`${spotifyToken}_global`, spotifyState.accessToken);
    updateStorage(`${spotifyRefreshToken}_global`, spotifyState.refreshToken);
    updateStorage(`${spotifyAccountType}_global`, spotifyState.accountType);
    updateStorage(`${spotifyTokenFetched}_global`, spotifyState.tokenFetched);
    updateStorage(`${spotifyTokenFetchedTime}_global`, spotifyState.tokenFetchedTime);
});


// Listen for storage events to sync across tabs
window.addEventListener('storage', (e) => {
    if (e.storageArea === localStorage) {
        const { key, newValue } = e;
        
        const state = store.getState().user;
        const spotifyState = store.getState().spotify;
        
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
        
        // Helper for Spotify boolean value (tokenFetched)
        const dispatchSpotifyBoolean = (currentValue: boolean, action: any) => {
            let parsedNewValue = false;
            try {
                if (newValue && newValue !== 'null') {
                    parsedNewValue = JSON.parse(newValue);
                }
            } catch (error) {
                console.warn(`Error parsing localStorage value for key "${key}":`, error);
            }
            
            if (currentValue !== parsedNewValue) {
                store.dispatch(action(parsedNewValue));
            }
        };

        switch (key) {
            case `${ADMIN}_global`:
                dispatchUpdate(state.admin, addAdmin, removeAdmin);
                break;
            case `${PROFILE}_global`:
                dispatchUpdate(state.profile, addProfile, removeProfile);
                break;
            case `${TOKEN}_global`:
                dispatchUpdate(state.token, addToken, removeToken);
                break;
            case `${PROFILEID}_global`:
                dispatchUpdate(state.profileId, addProfileId, removeProfileId);
                break;
            // Spotify cases
            case `${spotifyToken}_global`:
                dispatchUpdate(spotifyState.accessToken, setSpotifyAccessToken, resetSpotify);
                break;
            case `${spotifyRefreshToken}_global`:
                dispatchUpdate(spotifyState.refreshToken, setSpotifyRefreshToken, resetSpotify);
                break;
            case `${spotifyAccountType}_global`:
                dispatchUpdate(spotifyState.accountType, setSpotifyAccountType, resetSpotify);
                break;
            case `${spotifyTokenFetched}_global`:
                dispatchSpotifyBoolean(spotifyState.tokenFetched, setSpotifyTokenFetched);
                break;
            case `${spotifyTokenFetchedTime}_global`:
                dispatchUpdate(spotifyState.tokenFetchedTime, setSpotifyTokenFetchedTime, resetSpotify);
                break;
        }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
