import { removeItem } from '../Hooks/UseLocalStorage';
import {
    PROFILE_GLOBAL, PROFILEID_GLOBAL, ACKNOWLEDGED_NOTIFICATIONS_KEY,
    BACKGROUND_BLINK_SETTING, BLINK_NOTIFICATIONS_ENABLED_KEY, NOTIFICATION_POSITION_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY, PAGE_TRANSITIONS_ENABLED_KEY, SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY, SECURITY_LOCK_ENABLED_KEY, SECURITY_LOCK_TIMEOUT_KEY,
    WEBSOCKET_ENABLED_KEY, TOKEN_GLOBAL, ADMIN_GLOBAL, IS_MQTT_CONFIGURED_KEY,
    SPOTIFY_TOKEN_GLOBAL, SPOTIFY_REFRESH_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL, SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL, SPOTIFY_CODE_VERIFIER
} from '../Data/Constants';

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
export const clearLocalStorageOnProfileSwitch = () => { removeLocalStorageKeys(PROFILE_SWITCH_KEYS); };
export const resetSpotify = () => { removeLocalStorageKeys(SPOTIFY_KEYS); sessionStorage.removeItem(SPOTIFY_CODE_VERIFIER); };
export const clearLocalStorageOnLogout = () => { clearLocalStorageOnProfileSwitch(); removeLocalStorageKeys(LOGOUT_KEYS); resetSpotify(); };
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
