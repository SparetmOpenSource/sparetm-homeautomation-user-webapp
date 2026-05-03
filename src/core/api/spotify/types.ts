export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    uri: string;
    external_urls: {
        spotify: string;
    };
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    album_type: string;
    artists: SpotifyArtist[];
    images: SpotifyImage[];
    release_date: string;
    total_tracks: number;
    uri: string;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    duration_ms: number;
    explicit: boolean;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    uri: string;
}

export interface SpotifyDevice {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
}

export interface SpotifyContext {
    type: string;
    href: string;
    external_urls: {
        spotify: string;
    };
    uri: string;
}

export interface SpotifyPlaybackState {
    device: SpotifyDevice;
    repeat_state: string;
    shuffle_state: boolean;
    context: SpotifyContext | null;
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: SpotifyTrack | null;
    currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
}

export interface SpotifyQueueState {
    currently_playing: SpotifyTrack | null;
    queue: SpotifyTrack[];
}

export interface SpotifyApiResponse<T> {
    data: {
        body: T;
        status: number;
    };
}
