import SpotifyLogIn from '../../../CoreAppComponents/Widgets/Spotify/SpotifyLogIn';
import Weather from '../../../CoreAppComponents/Widgets/Weather/Weather';

export type WidgetItem = {
    id: number;
    component: JSX.Element;
};

export const getWidgets = (refreshKey: boolean, handleRefresh: () => void): WidgetItem[] => [
    {
        id: 1,
        component: (
            <SpotifyLogIn
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
            <SpotifyLogIn
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
