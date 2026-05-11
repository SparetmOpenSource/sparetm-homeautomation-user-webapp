import SpotifyLogIn from '../../../../features/dashboard/components/coreappcomponents/widgets/spotify/Spotifylogin';
import Weather from '../../../../features/dashboard/components/coreappcomponents/widgets/weather/Weather';

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
