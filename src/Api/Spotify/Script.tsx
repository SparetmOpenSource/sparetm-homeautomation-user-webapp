import { SPOTIFY_CODE_VERIFIER } from '../../Data/Constants';

export const getAccessToken = async (
    clientId: string,
    code: string,
    redirectUri: string,
): Promise<string> => {
    const verifier = sessionStorage.getItem(SPOTIFY_CODE_VERIFIER);

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('code_verifier', verifier!);

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
    });

    const { access_token } = await result.json();
    return access_token;
};
