import { RoutePath } from '../Data/Constants';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingFade from '../Components/Others/LoadingAnimation/LoadingFade';
import PublicRoute from '../Services/PublicRoute';
import ProtectedRoute from '../Services/ProtectedRoute';

const Home = React.lazy(() => import('./HomePage'));
const SignInSignUp = React.lazy(() => import('./SignInSignUpPage'));
const ProfilePage = React.lazy(() => import('./ProfileConfigPage'));
const AddProfile = React.lazy(
    () => import('./../Components/ProfileConfig/AddProfile/AddProfile'),
);
const SelectProfile = React.lazy(
    () => import('./../Components/ProfileConfig/SelectProfile/SelectProfile'),
);
const CoreApplication = React.lazy(() => import('./CoreApplication'));
const CoreApplicationDashBoard = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationDashBoard/CoreApplicationDashBoard'
        ),
);
const CoreApplicationPremium = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationPremium/CoreApplicationPremium'
        ),
);
const CoreApplicationSetting = React.lazy(
    () =>
        import(
            '../Components/CoreApplication/CoreApplicationSetting/CoreApplicationSetting'
        ),
);
const CoreApplicationDeviceRoom = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationDeviceRoom/CoreApplicationDeviceRoom'
        ),
);

const TodoListWrapper = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationDashBoard/Features/FeatureWrapper/TodoList/TodoListWrapper'
        ),
);

const StatusList = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationDashBoard/Features/FeatureWrapper/StatusList/StatusList'
        ),
);

const GettingStarted = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationConnection/GettingStarted/GettingStarted'
        ),
);

const SetupArduinoIde = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationConnection/SetupArduinoIde/SetupArduinoIde'
        ),
);
const ESP8266BasicSetup = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationConnection/ESP8266BasicSetup/ESP8266BasicSetup'
        ),
);

const CoreApplicationConnection = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationConnection/CoreApplicationConnection'
        ),
);

const SpecificDeviceCodes = React.lazy(
    () =>
        import(
            '../Components/CoreApplication/CoreApplicationConnection/SpecificDevice/SpecificDeviceCodes'
        ),
);

const ExampleCodes = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationConnection/ExampleCodes/ExampleCodes'
        ),
);

const AccountSetting = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationSetting/AccountSetting/AccountSetting'
        ),
);

const FeatureSetting = React.lazy(
    () =>
        import(
            './../Components/CoreApplication/CoreApplicationSetting/FeatureSetting/FeatureSetting'
        ),
);

export const GlobalRoutes = (props: any) => {
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
                                        to={RoutePath.Dashboard_Device_Status}
                                    />
                                }
                            />
                            <Route
                                path={RoutePath.Dashboard_Device_Status}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <StatusList />
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.Dashboard_Todo}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <TodoListWrapper />
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
                        >
                            <Route
                                path={RoutePath.Setting}
                                element={
                                    <Navigate
                                        replace
                                        to={RoutePath.Setting_Account}
                                    />
                                }
                            />
                            <Route
                                path={RoutePath.Setting_Account}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <AccountSetting/>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.Setting_Features}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <FeatureSetting/>
                                    </Suspense>
                                }
                            />
                        </Route>
                        {/************************************************/}
                        {/*********************CONNECTION*****************/}
                        {/************************************************/}
                        <Route
                            path={RoutePath.Connection}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <CoreApplicationConnection />
                                </Suspense>
                            }
                        >
                            <Route
                                path={RoutePath.Connection}
                                element={
                                    <Navigate
                                        replace
                                        to={RoutePath.GettingStartedDocs}
                                    />
                                }
                            />
                            <Route
                                path={RoutePath.GettingStartedDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <GettingStarted />
                                    </Suspense>
                                }
                            />
                            <Route
                                path={
                                    RoutePath.GettingStartedwithArduinoIdeDocs
                                }
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <SetupArduinoIde />
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.GettingStartedwithEsp8266Docs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <ESP8266BasicSetup />
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.Esp8266SpecificDeviceCodeDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <SpecificDeviceCodes />
                                        {/* <h1>device code</h1> */}
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.CodeExamplesDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        <ExampleCodes />
                                        {/* <h1>code ex</h1> */}
                                    </Suspense>
                                }
                            />
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
    );
};
