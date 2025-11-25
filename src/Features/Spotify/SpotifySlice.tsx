import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    spotifyToken,
    spotifyRefreshToken,
    spotifyAccountType,
    spotifyTokenFetched,
    spotifyTokenFetchedTime,
} from '../../Data/Constants';

// Helper to safely get from localStorage and parse JSON
const getStorageValue = (key: string, defaultValue: any = ''): any => {
    try {
        const value = localStorage.getItem(`${key}_global`);
        if (value === null || value === 'null') return defaultValue;
        return JSON.parse(value);
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
};

// State interface
interface SpotifyState {
    accessToken: string;
    refreshToken: string;
    accountType: string;
    tokenFetched: boolean;
    tokenFetchedTime: string;
}

// Initial state - load from localStorage
const initialState: SpotifyState = {
    accessToken: getStorageValue(spotifyToken, ''),
    refreshToken: getStorageValue(spotifyRefreshToken, ''),
    accountType: getStorageValue(spotifyAccountType, ''),
    tokenFetched: getStorageValue(spotifyTokenFetched, false),
    tokenFetchedTime: getStorageValue(spotifyTokenFetchedTime, ''),
};

// Spotify slice
const spotifySlice = createSlice({
    name: 'spotify',
    initialState,
    reducers: {
        setSpotifyTokens: (
            state,
            action: PayloadAction<{ accessToken: string; refreshToken: string }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setSpotifyAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setSpotifyRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        setSpotifyAccountType: (state, action: PayloadAction<string>) => {
            state.accountType = action.payload;
        },
        setSpotifyTokenFetched: (state, action: PayloadAction<boolean>) => {
            state.tokenFetched = action.payload;
        },
        setSpotifyTokenFetchedTime: (state, action: PayloadAction<string>) => {
            state.tokenFetchedTime = action.payload;
        },
        resetSpotify: (state) => {
            state.accessToken = '';
            state.refreshToken = '';
            state.accountType = '';
            state.tokenFetched = false;
            state.tokenFetchedTime = '';
        },
    },
});

export const {
    setSpotifyTokens,
    setSpotifyAccessToken,
    setSpotifyRefreshToken,
    setSpotifyAccountType,
    setSpotifyTokenFetched,
    setSpotifyTokenFetchedTime,
    resetSpotify,
} = spotifySlice.actions;

export default spotifySlice.reducer;
