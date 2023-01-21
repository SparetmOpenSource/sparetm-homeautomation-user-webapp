import React from 'react';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from '../../Data/Constant';
import CoreApplication from '../../Pages/CoreApplication';
import ProtectedRoute from '../../Services/ProtectedRoute';
import PublicRoute from '../../Services/PublicRoute';
import LoadingFade from './LoadingAnimation/LoadingFade/LoadingFade';

const Home = React.lazy(() => import('../../Pages/Home'));
const ProfileConfig = React.lazy(() => import('../../Pages/ProfileConfig'));
const CoreAppConnection = React.lazy(
    () => import('../CoreApplication/CoreAppConnection/CoreAppConnection'),
);
const CoreAppDashBoard = React.lazy(
    () => import('../CoreApplication/CoreAppDashBoard/CoreAppDashBoard'),
);
const CoreAppDeviceRoom = React.lazy(
    () => import('../CoreApplication/CoreAppDeviceRoom/CoreAppDeviceRoom'),
);
const CoreAppPremium = React.lazy(
    () => import('../CoreApplication/CoreAppPremium/CoreAppPremium'),
);
const CoreAppSetting = React.lazy(
    () => import('../CoreApplication/CoreAppSetting/CoreAppSetting'),
);
const About = React.lazy(() => import('../Home/About/About'));
const AddProfile = React.lazy(
    () => import('../ProfileConfig/AddProfile/AddProfile'),
);
const EditProfile = React.lazy(
    () => import('../ProfileConfig/EditProfile/EditProfile'),
);
const SelectProfile = React.lazy(
    () => import('../ProfileConfig/SelectProfile/SelectProfile'),
);

const GlobalRoutes = () => {
    return (
        <Suspense fallback={<LoadingFade />}>
            <Routes>
                {/************************HOME PAGE*****************************/}
                <Route element={<PublicRoute />}>
                    <Route
                        path={RoutePath.Home}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route
                        path={RoutePath.About}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <About />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<ProtectedRoute />}>
                    {/***********************ADD/SELECT/EDIT PROFILE***************************/}
                    <Route
                        path={RoutePath.ProfileConfig}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <ProfileConfig />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RoutePath.ProfileConfig}
                            element={
                                <Navigate
                                    replace
                                    to={RoutePath.AddProfileConfig}
                                />
                            }
                        />
                        <Route
                            path={RoutePath.AddProfileConfig}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <AddProfile />
                                </Suspense>
                            }
                        />
                        <Route
                            path={RoutePath.SelectProfileConfig}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <SelectProfile />
                                </Suspense>
                            }
                        />
                        <Route
                            path={RoutePath.EditProfileConfig}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <EditProfile />
                                </Suspense>
                            }
                        />
                    </Route>
                    {/**********************CORE APPLICATION ROUTE*****************************/}
                    <Route
                        path={RoutePath.CoreApplication}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <CoreApplication />
                            </Suspense>
                        }
                    >
                        <Route
                            path={RoutePath.CoreApplication}
                            element={
                                <Navigate replace to={RoutePath.Dashboard} />
                            }
                        />
                        <Route
                            path={RoutePath.Dashboard}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreAppDashBoard />
                                </Suspense>
                            }
                        />
                        {/**********************Device ROOM ROUTE*****************************/}
                        <Route
                            path={RoutePath.DeviceRoom}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreAppDeviceRoom />
                                </Suspense>
                            }
                        />
                        {/**********************PREMIUM ROUTE*****************************/}
                        <Route
                            path={RoutePath.Premium}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreAppPremium />
                                </Suspense>
                            }
                        />
                        {/**********************SETTING PAGE*****************************/}
                        <Route
                            path={RoutePath.Setting}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreAppSetting />
                                </Suspense>
                            }
                        />
                        {/* ********************CONNECTION ROUTE********************** */}
                        <Route
                            path={RoutePath.Connection}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreAppConnection />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>
                {/************************NOT FOUND**************************/}
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<LoadingFade />}>
                            <h1>NotFound </h1>
                        </Suspense>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default GlobalRoutes;
