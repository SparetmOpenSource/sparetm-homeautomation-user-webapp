import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingFade from '../../Components/Others/LoadingAnimation/LoadingFade';
import PublicRoute from '../../Services/PublicRoute';
import ProtectedRoute from '../../Services/ProtectedRoute';
import { RoutePath } from '../../Data/Constants';
import {
    AddProfile,
    Connection,
    CoreApplication,
    DashBoard,
    DeviceRoom,
    Home,
    NotFound,
    Play,
    ProfilePage,
    SelectProfile,
    Setting,
    SignInSignUp,
} from './GlobalRoutePages';

const routes = [
    {
        path: RoutePath.Home,
        element: <Home />,
        isPublic: true,
    },
    {
        path: RoutePath.About,
        element: <h1>About screen</h1>,
        isPublic: true,
    },
    {
        path: RoutePath.Auth,
        element: <SignInSignUp />,
        isPublic: true,
    },
    {
        path: RoutePath.ProfileConfig,
        element: <ProfilePage />,
        children: [
            {
                path: RoutePath.ProfileConfig,
                element: <Navigate replace to={RoutePath.AddProfileConfig} />,
            },
            {
                path: RoutePath.AddProfileConfig,
                element: <AddProfile />,
            },
            {
                path: RoutePath.SelectProfileConfig,
                element: <SelectProfile />,
            },
        ],
    },
    {
        path: RoutePath.CoreApplication,
        element: <CoreApplication />,
        children: [
            {
                path: RoutePath.CoreApplication,
                element: <Navigate replace to={RoutePath.Dashboard} />,
            },
            {
                path: RoutePath.Dashboard,
                element: <DashBoard />,
                children: [
                    {
                        path: RoutePath.Dashboard,
                        element: (
                            <Navigate
                                replace
                                to={RoutePath.Dashboard_Device_Status}
                            />
                        ),
                    },
                    {
                        path: RoutePath.Dashboard_Device_Status,
                        element: <h1>Status</h1>,
                    },
                    {
                        path: RoutePath.Dashboard_Todo,
                        element: <h1>Todo</h1>,
                    },
                ],
            },
            {
                path: RoutePath.DeviceRoom,
                element: <DeviceRoom />,
            },
            {
                path: RoutePath.Play,
                element: <Play />,
            },
            {
                path: RoutePath.Setting,
                element: <Setting />,
                children: [
                    {
                        path: RoutePath.Setting,
                        element: (
                            <Navigate replace to={RoutePath.Setting_Account} />
                        ),
                    },
                    {
                        path: RoutePath.Setting_Account,
                        element: <h1>Account setting</h1>,
                    },
                    {
                        path: RoutePath.Setting_Features,
                        element: <h1>Feature Setting</h1>,
                    },
                ],
            },
            {
                path: RoutePath.Connection,
                element: <Connection />,
                children: [
                    {
                        path: RoutePath.Connection,
                        element: (
                            <Navigate
                                replace
                                to={RoutePath.GettingStartedDocs}
                            />
                        ),
                    },
                    {
                        path: RoutePath.GettingStartedDocs,
                        element: <h1>Getting started !</h1>,
                    },
                    {
                        path: RoutePath.GettingStartedwithArduinoIdeDocs,
                        element: <h1>Arduino id docs !</h1>,
                    },
                    {
                        path: RoutePath.GettingStartedwithEsp8266Docs,
                        element: <h1>Esp8266 basic !</h1>,
                    },
                    {
                        path: RoutePath.Esp8266SpecificDeviceCodeDocs,
                        element: <h1>Specific device !</h1>,
                    },
                    {
                        path: RoutePath.CodeExamplesDocs,
                        element: <h1>Code examples !</h1>,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
        isPublic: true,
    },
];

const renderRoutes = (routes: any) => {
    return routes.map((route: any) => {
        const { path, element, children, isPublic } = route;
        const RouteElement = isPublic ? PublicRoute : ProtectedRoute;

        return (
            <Route
                key={path}
                path={path}
                element={<RouteElement>{element}</RouteElement>}
            >
                {children && renderRoutes(children)}
            </Route>
        );
    });
};

export const GlobalRoutes = () => {
    return (
        <Suspense fallback={<LoadingFade />}>
            <Routes>{renderRoutes(routes)}</Routes>
        </Suspense>
    );
};
