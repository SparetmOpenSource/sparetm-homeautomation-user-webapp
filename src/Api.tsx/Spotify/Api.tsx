import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import { displayToastify, generateRandomString } from '../../Utils/HelperFn';
import { api } from '../Axios';

const spotifyUrlForAuth: string = 'https://accounts.spotify.com/authorize?';
const redirect_uri: string =
    'http://localhost:3000/app/dashboard/segment/status';
const apiScope = [
    'user-library-read',
    'playlist-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
];
let state = generateRandomString(16);
localStorage.setItem('spotifyStateKey', state);
const client_id = 'ad37eacb72aa4f8891ccda3c0782b86a';
//const client_secret = 'c19f5a4a2fc14101a6ec94df78deb5f3';

export const loginEndpointForSpotify = `${spotifyUrlForAuth}client_id=${encodeURIComponent(
    client_id,
)}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(
    apiScope.join('%20'),
)}&response_type=token&state=${encodeURIComponent(state)}&show_dialog=true`;

export const getPlaybackState = async (authToken: string) => {
    try {
        const response = await api.get(`https://api.spotify.com/v1/me/player`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        // Handle 204 No Content (no active device/playback)
        if (response.status === 204) {
            // displayToastify(
            //     `Spotify not active on any device !`,
            //     darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
            //     TOASTIFYSTATE.INFO,
            // );
            // return { data: null, status: 204 };
            return undefined;
        }

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.error?.status === 401) {
            console.error(
                'Error fetching playback state:',
                error?.response?.data?.error?.status,
            );

            localStorage.removeItem('spotify_token');
        }
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};
