import {
    ACKNOWLEDGED_NOTIFICATIONS_KEY,
    ADMIN_GLOBAL,
    BACKGROUND_BLINK_SETTING, BLINK_NOTIFICATIONS_ENABLED_KEY,
    IS_MQTT_CONFIGURED_KEY,
    NOTIFICATION_POSITION_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY, PAGE_TRANSITIONS_ENABLED_KEY,
    PROFILE_GLOBAL, PROFILEID_GLOBAL,
    SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY, SECURITY_LOCK_ENABLED_KEY, SECURITY_LOCK_TIMEOUT_KEY,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_CODE_VERIFIER,
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL, SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
    SPOTIFY_TOKEN_GLOBAL,
    TOKEN_GLOBAL,
    WEBSOCKET_ENABLED_KEY
} from '../../../data/constants';
import { getItem, removeItem } from '../../../hooks/uselocalstorage';
import useLocalStorageHook from '../../../hooks/uselocalstorage';
import { useMemo } from 'react';

import { useSelector } from 'react-redux';

let getProfileIdProvider: () => string | null = () => getItem(PROFILEID_GLOBAL);

/**
 * Sets the provider for the current profileId.
 * Standard FAANG practice to unify source of truth (Redux) with non-UI layers (Axios/Auth).
 */
export const setProfileIdProvider = (provider: () => string | null) => {
    getProfileIdProvider = provider;
};

/**
 * Returns a profile-specific key for localStorage
 */
export const getProfileKey = (baseKey: string) => {
    const profileId = getProfileIdProvider();
    // Remove any existing _global or other suffixes from the baseKey to keep it clean
    const cleanBase = baseKey.replace('_global', '');
    return profileId ? `${cleanBase}_${profileId}` : cleanBase;
};

/**
 * Hook for profile-specific localStorage
 */
export function useProfileLocalStorage<T>(baseKey: string, initialValue: T) {
    const profileId = useSelector((state: any) => state.user.profileId);
    const key = useMemo(() => {
        const cleanBase = baseKey.replace('_global', '');
        return profileId ? `${cleanBase}_${profileId}` : cleanBase;
    }, [baseKey, profileId]);

    return useLocalStorageHook<T>(key, initialValue);
}

const PROFILE_SWITCH_KEYS = [
    PROFILE_GLOBAL, PROFILEID_GLOBAL, ACKNOWLEDGED_NOTIFICATIONS_KEY,
    BACKGROUND_BLINK_SETTING, BLINK_NOTIFICATIONS_ENABLED_KEY, NOTIFICATION_POSITION_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY, PAGE_TRANSITIONS_ENABLED_KEY, SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY, SECURITY_LOCK_ENABLED_KEY, SECURITY_LOCK_TIMEOUT_KEY, WEBSOCKET_ENABLED_KEY,
];

const LOGOUT_KEYS = [TOKEN_GLOBAL, ADMIN_GLOBAL, IS_MQTT_CONFIGURED_KEY];

const SPOTIFY_KEYS = [
    SPOTIFY_TOKEN_GLOBAL, SPOTIFY_REFRESH_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL, SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
];

export const removeLocalStorageKeys = (keys: string[]) => { keys.forEach((key) => removeItem(key)); };
export const clearLocalStorageOnProfileSwitch = () => {
    removeLocalStorageKeys(PROFILE_SWITCH_KEYS);
};

/**
 * Clears Spotify data for the CURRENT profile only
 */
export const resetSpotify = () => {
    const prefixes = SPOTIFY_KEYS.map(key => key.replace('_global', ''));
    prefixes.forEach(prefix => {
        removeItem(getProfileKey(prefix));
    });
    sessionStorage.removeItem(SPOTIFY_CODE_VERIFIER);
};

/**
 * Clears ALL Spotify data for ALL profiles from localStorage
 */
export const clearAllSpotifyData = () => {
    const prefixes = SPOTIFY_KEYS.map(key => key.replace('_global', ''));
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && prefixes.some(prefix => key.startsWith(prefix))) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => removeItem(key));
    sessionStorage.removeItem(SPOTIFY_CODE_VERIFIER);
};

export const clearLocalStorageOnLogout = () => {
    clearLocalStorageOnProfileSwitch();
    removeLocalStorageKeys(LOGOUT_KEYS);
    clearAllSpotifyData(); // Wipe all Spotify data for all profiles
};

export const spotifyLogout = () => { resetSpotify(); };

export const generateCodeChallenge = async () => {
    const generateRandomString = (length: number) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    };

    const sha256 = async (plain: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    };

    const base64encode = (input: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    return { codeVerifier, codeChallenge };
};
