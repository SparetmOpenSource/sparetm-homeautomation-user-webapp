import React from 'react';

export const Home = React.lazy(() => import('./../Home/Home'));
export const SignInSignUp = React.lazy(() => import('./../SignUp/SignUp'));
export const ProfilePage = React.lazy(
    () => import('./../ProfileConfig/ProfileConfig'),
);
export const AddProfile = React.lazy(
    () => import('./../../Components/ProfileConfig/Add/Add'),
);
export const SelectProfile = React.lazy(
    () => import('./../../Components/ProfileConfig/Select/Select'),
);
export const CoreApplication = React.lazy(
    () => import('./../CoreApplication/CoreApplication'),
);
export const DashBoard = React.lazy(
    () => import('./../../Components/CoreApplicationNew/DashBoard/DashBoard'),
);
export const Play = React.lazy(
    () => import('../../Components/CoreApplicationNew/Play/Play'),
);
export const Setting = React.lazy(
    () => import('../../Components/CoreApplicationNew/Setting/Setting'),
);
export const DeviceRoom = React.lazy(
    () => import('./../../Components/CoreApplicationNew/DeviceRoom/DeviceRoom'),
);
export const Connection = React.lazy(
    () => import('./../../Components/CoreApplicationNew/Connection/Connection'),
);

// ---------------------------------------------------------------- //

export const TodoListWrapper = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationDashBoard/Features/FeatureWrapper/TodoList/TodoListWrapper'
        ),
);

export const StatusList = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationDashBoard/Features/FeatureWrapper/StatusList/StatusList'
        ),
);

export const GettingStarted = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/GettingStarted/GettingStarted'
        ),
);

export const SetupArduinoIde = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/SetupArduinoIde/SetupArduinoIde'
        ),
);
export const ESP8266BasicSetup = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/ESP8266BasicSetup/ESP8266BasicSetup'
        ),
);



export const SpecificDeviceCodes = React.lazy(
    () =>
        import(
            '../../Components/CoreApplication/CoreApplicationConnection/SpecificDevice/SpecificDeviceCodes'
        ),
);

export const ExampleCodes = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/ExampleCodes/ExampleCodes'
        ),
);

export const AccountSetting = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationSetting/AccountSetting/AccountSetting'
        ),
);

export const FeatureSetting = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationSetting/FeatureSetting/FeatureSetting'
        ),
);

export const NotFound = React.lazy(() => import('./../NotFound/NotFound'));
