import { RoutePath } from '../../Data/Constants';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingFade from '../../Components/Others/LoadingAnimation/LoadingFade';
import PublicRoute from '../../Services/PublicRoute';
import ProtectedRoute from '../../Services/ProtectedRoute';
import {
    AccountSetting,
    AddProfile,
    CoreApplication,
    Connection,
    DashBoard,
    DeviceRoom,
    Play,
    Setting,
    ESP8266BasicSetup,
    ExampleCodes,
    FeatureSetting,
    GettingStarted,
    Home,
    NotFound,
    ProfilePage,
    SelectProfile,
    SetupArduinoIde,
    SignInSignUp,
    SpecificDeviceCodes,
    StatusList,
    TodoListWrapper,
} from './GlobalRoutesPages';

// const protected_routes = {

//     profile_config: {
//         path: RoutePath.ProfileConfig,
//         page: <ProfilePage />,
//         to: RoutePath.AddProfileConfig,
//     },
//     profile_config_child: [
//         {
//             id: 1,
//             path: RoutePath.AddProfileConfig,
//             page: <AddProfile />,
//         },
//         {
//             id: 2,
//             path: RoutePath.SelectProfileConfig,
//             page: <SelectProfile />,
//         },
//     ],

//     // ------------------------------------------------- //

//     core_app: {
//         path: RoutePath.CoreApplication,
//         page: <CoreApplication />,
//         to: RoutePath.Dashboard,
//     },
//     core_app_child: [
//         {
//             id: 1,
//             path: RoutePath.AddProfileConfig,
//             page: <AddProfile />,
//         },
//         {
//             id: 2,
//             path: RoutePath.SelectProfileConfig,
//             page: <SelectProfile />,
//         },
//     ],
// };

export const GlobalRoutes = () => {
    return (
        // <Suspense fallback={<LoadingFade />}>
        //     <Routes>
        //         <Route element={<PublicRoute />}>
        //             {public_routes?.map((item: any) => (
        //                 <Route
        //                     key={item?.id}
        //                     path={item?.path}
        //                     element={
        //                         <Suspense fallback={<LoadingFade />}>
        //                             {item?.page}
        //                         </Suspense>
        //                     }
        //                 />
        //             ))}
        //         </Route>
        //         <Route element={<ProtectedRoute />}>
        //             {/********************Profile routes*************/}

        //             <Route
        //                 path={protected_routes?.profile_config?.path}
        //                 element={
        //                     <Suspense fallback={<LoadingFade />}>
        //                         {protected_routes?.profile_config?.page}
        //                     </Suspense>
        //                 }
        //             >
        //                 <Route
        //                     path={RoutePath.ProfileConfig}
        //                     element={
        //                         <Navigate
        //                             replace
        //                             to={protected_routes?.profile_config?.to}
        //                         />
        //                     }
        //                 />
        //                 {protected_routes?.profile_config_child?.map(
        //                     (item: any) => (
        //                         <Route
        //                             key={item?.id}
        //                             path={item?.path}
        //                             element={
        //                                 <Suspense fallback={<LoadingFade />}>
        //                                     {item?.page}
        //                                 </Suspense>
        //                             }
        //                         />
        //                     ),
        //                 )}
        //             </Route>
        //             {/************************************************/}
        //             {/******************CORE APPLICATION**************/}
        //             {/************************************************/}

        //             <Route
        //                 path={RoutePath.CoreApplication}
        //                 element={
        //                     <Suspense fallback={<LoadingFade />}>
        //                         <CoreApplication />
        //                     </Suspense>
        //                 }
        //             >
        //                 <Route
        //                     path={RoutePath.CoreApplication}
        //                     element={
        //                         <Navigate replace to={RoutePath.Dashboard} />
        //                     }
        //                 />
        //                 {/************************************************/}
        //                 {/*********************Dashboard******************/}
        //                 {/************************************************/}
        //                 <Route
        //                     path={RoutePath.Dashboard}
        //                     element={
        //                         <Suspense fallback={<LoadingFade />}>
        //                             <CoreApplicationDashBoard />
        //                         </Suspense>
        //                     }
        //                 >
        //                     <Route
        //                         path={RoutePath.Dashboard}
        //                         element={
        //                             <Navigate
        //                                 replace
        //                                 to={RoutePath.Dashboard_Device_Status}
        //                             />
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.Dashboard_Device_Status}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <StatusList />
        //                             </Suspense>
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.Dashboard_Todo}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <TodoListWrapper />
        //                             </Suspense>
        //                         }
        //                     />
        //                 </Route>

        //                 {/************************************************/}
        //                 {/*********************Device ROOM****************/}
        //                 {/************************************************/}
        //                 <Route
        //                     path={RoutePath.DeviceRoom}
        //                     element={
        //                         <Suspense fallback={<LoadingFade />}>
        //                             <CoreApplicationDeviceRoom />
        //                         </Suspense>
        //                     }
        //                 ></Route>
        //                 {/************************************************/}
        //                 {/*********************PREMIUM********************/}
        //                 {/************************************************/}
        //                 <Route
        //                     path={RoutePath.Premium}
        //                     element={
        //                         <Suspense fallback={<LoadingFade />}>
        //                             <CoreApplicationPremium />
        //                         </Suspense>
        //                     }
        //                 />
        //                 {/************************************************/}
        //                 {/*********************SETTING********************/}
        //                 {/************************************************/}
        //                 <Route
        //                     path={RoutePath.Setting}
        //                     element={
        //                         <Suspense fallback={<LoadingFade />}>
        //                             <CoreApplicationSetting />
        //                         </Suspense>
        //                     }
        //                 >
        //                     <Route
        //                         path={RoutePath.Setting}
        //                         element={
        //                             <Navigate
        //                                 replace
        //                                 to={RoutePath.Setting_Account}
        //                             />
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.Setting_Account}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <AccountSetting />
        //                             </Suspense>
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.Setting_Features}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <FeatureSetting />
        //                             </Suspense>
        //                         }
        //                     />
        //                 </Route>
        //                 {/************************************************/}
        //                 {/*********************CONNECTION*****************/}
        //                 {/************************************************/}
        //                 <Route
        //                     path={RoutePath.Connection}
        //                     element={
        //                         <Suspense fallback={<LoadingFade />}>
        //                             <CoreApplicationConnection />
        //                         </Suspense>
        //                     }
        //                 >
        //                     <Route
        //                         path={RoutePath.Connection}
        //                         element={
        //                             <Navigate
        //                                 replace
        //                                 to={RoutePath.GettingStartedDocs}
        //                             />
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.GettingStartedDocs}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <GettingStarted />
        //                             </Suspense>
        //                         }
        //                     />
        //                     <Route
        //                         path={
        //                             RoutePath.GettingStartedwithArduinoIdeDocs
        //                         }
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <SetupArduinoIde />
        //                             </Suspense>
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.GettingStartedwithEsp8266Docs}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <ESP8266BasicSetup />
        //                             </Suspense>
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.Esp8266SpecificDeviceCodeDocs}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <SpecificDeviceCodes />
        //                                 {/* <h1>device code</h1> */}
        //                             </Suspense>
        //                         }
        //                     />
        //                     <Route
        //                         path={RoutePath.CodeExamplesDocs}
        //                         element={
        //                             <Suspense fallback={<LoadingFade />}>
        //                                 <ExampleCodes />
        //                                 {/* <h1>code ex</h1> */}
        //                             </Suspense>
        //                         }
        //                     />
        //                 </Route>
        //             </Route>
        //         </Route>

        //         {/* -----------Not found route----------- */}
        //         <Route
        //             path={not_found_route?.path}
        //             element={
        //                 <Suspense fallback={<LoadingFade />}>
        //                     {not_found_route?.page}
        //                 </Suspense>
        //             }
        //         />
        //     </Routes>
        // </Suspense>
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
                                    <DashBoard />
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
                                        {/* <StatusList /> */}
                                        <h1>Status</h1>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.Dashboard_Todo}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        {/* <TodoListWrapper /> */}
                                        <h1>Todo</h1>
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
                                    <DeviceRoom />
                                </Suspense>
                            }
                        ></Route>
                        {/************************************************/}
                        {/*********************PREMIUM********************/}
                        {/************************************************/}
                        <Route
                            path={RoutePath.Play}
                            element={
                                <Suspense fallback={<LoadingFade />}>
                                    <Play />
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
                                    <Setting />
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
                                        {/* <Setting /> */}
                                        <h1>Account setting</h1>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.Setting_Features}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        {/* <FeatureSetting /> */}
                                        <h1>Feature Setting</h1>
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
                                    <Connection />
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
                                        {/* <GettingStarted /> */}
                                        <h1>Getting started !</h1>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={
                                    RoutePath.GettingStartedwithArduinoIdeDocs
                                }
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        {/* <SetupArduinoIde /> */}
                                        <h1>Arduino id docs !</h1>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.GettingStartedwithEsp8266Docs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        {/* <ESP8266BasicSetup /> */}
                                        <h1>Esp8266 basic !</h1>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.Esp8266SpecificDeviceCodeDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        {/* <SpecificDeviceCodes /> */}
                                        <h1>Specific device !</h1>
                                    </Suspense>
                                }
                            />
                            <Route
                                path={RoutePath.CodeExamplesDocs}
                                element={
                                    <Suspense fallback={<LoadingFade />}>
                                        {/* <ExampleCodes /> */}
                                        <h1>Code examples !</h1>
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
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
        </Suspense>
    );
};
