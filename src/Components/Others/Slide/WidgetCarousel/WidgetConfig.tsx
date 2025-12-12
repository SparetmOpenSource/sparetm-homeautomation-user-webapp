import Spotify from '../../Widgets/Spotify/SpotifyLogIn';
import Weather from '../../Widgets/Weather/Weather';

export type WidgetItem = {
    id: number;
    component: JSX.Element;
};

export const getWidgets = (refreshKey: boolean, handleRefresh: () => void): WidgetItem[] => [
    {
        id: 1,
        component: (
            <Spotify
                key={refreshKey.toString()}
                handleRefresh={handleRefresh}
            />
        ),
    },
    {
        id: 2,
        component: <Weather />,
    },
     {
        id: 3,
        component: (
            <Spotify
                key={refreshKey.toString()}
                handleRefresh={handleRefresh}
            />
        ),
    },
    {
        id: 4,
        component: <Weather />,
    },
    // Add new widgets here
];
