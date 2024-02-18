import { RoutePath} from '../Data/Constants'
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingFade from '../Components/Others/LoadingAnimation/LoadingFade';
import PublicRoute from '../Services/PublicRoute';
import ProtectedRoute from '../Services/ProtectedRoute';

const Home = React.lazy(() => import('./HomePage'));
const SignInSignUp = React.lazy(() => import('./SignInSignUpPage'));
const ProfilePage = React.lazy(() => import('./ProfileConfigPage'));
const AddProfile =  React.lazy(() => import('./../Components/ProfileConfig/AddProfile/AddProfile'));
const SelectProfile = React.lazy(() => import('./../Components/ProfileConfig/SelectProfile/SelectProfile'));
const CoreApplication = React.lazy(() => import('./CoreApplication'));
const CoreApplicationDashBoard = React.lazy(() => import('./../Components/CoreApplication/CoreApplicationDashBoard/CoreApplicationDashBoard'));
const CoreApplicationPremium = React.lazy(() => import('./../Components/CoreApplication/CoreApplicationPremium/CoreApplicationPremium'));
const CoreApplicationSetting =  React.lazy(() => import('../Components/CoreApplication/CoreApplicationSetting/CoreApplicationSetting'));
const CoreApplicationDeviceRoom = React.lazy(() => import('./../Components/CoreApplication/CoreApplicationDeviceRoom/CoreApplicationDeviceRoom'));

export const GlobalRoutes = () => {
    return (
       <Suspense fallback={<LoadingFade />}>
            <Routes>

                {/* -----------Public route----------- */}
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
                                {/* <About /> */}
                                <h1>About screen</h1>
                            </Suspense>
                        }
                    />
                    <Route
                        path={RoutePath.Auth}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <SignInSignUp />
                            </Suspense>
                        }
                    />
                </Route>

                {/* -----------Protected route----------- */}
                <Route element={<ProtectedRoute />}>

                     {/************************************************/}
                    {/********************Profile*********************/}
                    {/************************************************/}

                    <Route
                        path={RoutePath.ProfileConfig}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <ProfilePage />
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
                    </Route>
                     {/************************************************/}
                    {/******************CORE APPLICATION**************/}
                    {/************************************************/}

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
                        {/************************************************/}
                        {/*********************Dashboard******************/}
                        {/************************************************/}
                        <Route
                            path={RoutePath.Dashboard}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreApplicationDashBoard /> 
                                </Suspense>
                            }
                        >
                            <Route
                                path={RoutePath.Dashboard}
                                element={
                                    <Navigate
                                        replace
                                        to={RoutePath.Dashboard_Todo}
                                    />
                                }
                            />
                            <Route
                                path={RoutePath.Dashboard_Todo}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        {/* <ToDoListWrapper /> */}
                                        <h1>ToDoListWrapper</h1>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.Dashboard_Device_Status}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <h1>DEVICE STATUS</h1>
                                    </Suspense>
                                }
                            />
                        </Route>

                        {/************************************************/}
                        {/*********************Device ROOM****************/}
                        {/************************************************/}

                        <Route
                            path={RoutePath.DeviceRoom}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreApplicationDeviceRoom />
                                </Suspense>
                            }
                        ></Route>
                        {/************************************************/}
                        {/*********************PREMIUM********************/}
                        {/************************************************/}
                        <Route
                            path={RoutePath.Premium}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreApplicationPremium /> 
                                </Suspense>
                            }
                        />
                        {/************************************************/}
                        {/*********************SETTING********************/}
                        {/************************************************/}
                        <Route
                            path={RoutePath.Setting}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreApplicationSetting /> 
                                </Suspense>
                            }
                        />
                        {/************************************************/}
                        {/*********************CONNECTION*****************/}
                        {/************************************************/}
                        <Route
                            path={RoutePath.Connection}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    {/* <CoreAppConnection /> */}
                                    <h1>CoreAppConnection</h1>
                                </Suspense>
                            }
                        >
                            {/* <Route
                                path={RoutePath.Connection}
                                element={
                                    <Navigate
                                        replace
                                        to={RoutePath.GettingStartedDocs}
                                    />
                                }
                            /> */}
                            {/* <Route
                                path={RoutePath.GettingStartedDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <GettingStarted />
                                    </Suspense>
                                }
                            /> */}
                            {/* <Route
                                path={
                                    RoutePath.GettingStartedwithArduinoIdeDocs
                                }
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <SetupArduinoIde />
                                    </Suspense>
                                }
                            /> */}
                            {/* <Route
                                path={RoutePath.GettingStartedwithEsp8266Docs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <ESP8266BasicSetup />
                                    </Suspense>
                                }
                            /> */}
                            {/* <Route
                                path={RoutePath.Esp8266SpecificDeviceCodeDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <h1>esp8266 specific device code</h1>
                                    </Suspense>
                                }
                            /> */}
                            {/* <Route
                                path={RoutePath.CodeExamplesDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <h1>Code Examples</h1>
                                    </Suspense>
                                }
                            /> */}
                        </Route>
                    </Route>

                </Route>

                {/* -----------Not found route----------- */}
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<LoadingFade />}>
                            <h1>NotFound screen</h1>
                        </Suspense>
                    }
                />
            </Routes>
        </Suspense>
  )
}
