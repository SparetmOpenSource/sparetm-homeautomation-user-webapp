import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../data/Constants';
import Todo from '../../../features/dashboard/components/coreapplication/dashboard/todo/Todo';
import Account from '../../../features/dashboard/components/coreapplication/setting/account/Account';
import Preferences from '../../../features/dashboard/components/coreapplication/setting/preferences/Preferences';
import HomeWithLoader from '../../../features/home/pages/home/homewithloader/Homewithloader';
import LoadingFade from '../../../shared/commoncomponents/loadinganimation/Loadingfade';
import ProtectedRoute from '../Protectedroute';
import PublicRoute from '../Publicroute';
import {
    About,
    AddProfile,
    ArduinoIde,
    Chat,
    Connection,
    CoreApplication,
    DashBoard,
    DeviceRoom,
    NotFound,
    Overview,
    Play,
    ProfilePage,
    SelectProfile,
    Setting,
    SignInSignUp,
} from './Globalroutepages';

const routes = [
    {
        path: RoutePath.Home,
        element: <HomeWithLoader />,
        isPublic: true,
    },
    {
        path: RoutePath.About,
        element: <About />,
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
                        element: <h1>status</h1>,
                    },
                    {
                        path: RoutePath.Dashboard_Todo,
                        element: <Todo />,
                    },
                ],
            },
            {
                path: RoutePath.DeviceRoom,
                element: <DeviceRoom />,
            },
            {
                path: RoutePath.Chat,
                element: <Chat />,
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
                        element: <Account />,
                    },
                    {
                        path: RoutePath.Setting_Features,
                        element: <Preferences />,
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
                        element: <Overview />,
                    },
                    {
                        path: RoutePath.GettingStartedwithArduinoIdeDocs,
                        element: <ArduinoIde />,
                    },
                    {
                        path: RoutePath.GettingStartedwithEsp8266Esp32Docs,
                        element: <h1>Esp8266/esp32 basic !</h1>,
                    },
                    {
                        path: RoutePath.Esp8266SpecificDeviceCodeDocs,
                        element: <h1>Specific device !</h1>,
                    },
                    {
                        path: RoutePath.CodeExamplesDocs,
                        element: <h1>Code examples !</h1>,
                    },
                    {
                        path: RoutePath.HardwareConnection,
                        element: <h1>Hardware connection !</h1>,
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
    const location = useLocation();
    return (
        <Suspense fallback={<LoadingFade />}>
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    {renderRoutes(routes)}
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};
