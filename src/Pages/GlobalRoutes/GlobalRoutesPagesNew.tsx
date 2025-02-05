import React from 'react';

// -------------------- Core Application Components -------------------- //
const CoreApplication = React.lazy(
    () => import('./../CoreApplication/CoreApplication'),
);
const DashBoard = React.lazy(
    () => import('./../../Components/CoreApplicationNew/DashBoard/DashBoard'),
);
const Play = React.lazy(
    () => import('../../Components/CoreApplicationNew/Play/Play'),
);
const Setting = React.lazy(
    () => import('../../Components/CoreApplicationNew/Setting/Setting'),
);
const DeviceRoom = React.lazy(
    () => import('./../../Components/CoreApplicationNew/DeviceRoom/DeviceRoom'),
);
const Connection = React.lazy(
    () => import('./../../Components/CoreApplicationNew/Connection/Connection'),
);

// -------------------- Dashboard Features -------------------- //
const TodoListWrapper = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationDashBoard/Features/FeatureWrapper/TodoList/TodoListWrapper'
        ),
);
const StatusList = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationDashBoard/Features/FeatureWrapper/StatusList/StatusList'
        ),
);

// -------------------- Connection Components -------------------- //
const GettingStarted = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/GettingStarted/GettingStarted'
        ),
);
const SetupArduinoIde = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/SetupArduinoIde/SetupArduinoIde'
        ),
);
const ESP8266BasicSetup = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/ESP8266BasicSetup/ESP8266BasicSetup'
        ),
);
const SpecificDeviceCodes = React.lazy(
    () =>
        import(
            '../../Components/CoreApplication/CoreApplicationConnection/SpecificDevice/SpecificDeviceCodes'
        ),
);
const ExampleCodes = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationConnection/ExampleCodes/ExampleCodes'
        ),
);

// -------------------- Setting Components -------------------- //
const AccountSetting = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationSetting/AccountSetting/AccountSetting'
        ),
);
const FeatureSetting = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/CoreApplicationSetting/FeatureSetting/FeatureSetting'
        ),
);

// -------------------- Profile Components -------------------- //
const ProfilePage = React.lazy(
    () => import('./../ProfileConfig/ProfileConfig'),
);
const AddProfile = React.lazy(
    () => import('./../../Components/ProfileConfig/Add/Add'),
);
const SelectProfile = React.lazy(
    () => import('./../../Components/ProfileConfig/Select/Select'),
);

// -------------------- Authentication Components -------------------- //
const Home = React.lazy(() => import('./../Home/Home'));
const SignInSignUp = React.lazy(() => import('./../SignUp/SignUp'));

// -------------------- Miscellaneous Components -------------------- //
const NotFound = React.lazy(() => import('./../NotFound/NotFound'));

// Export all components
export {
    Home,
    SignInSignUp,
    ProfilePage,
    AddProfile,
    SelectProfile,
    CoreApplication,
    DashBoard,
    Play,
    Setting,
    DeviceRoom,
    Connection,
    TodoListWrapper,
    StatusList,
    GettingStarted,
    SetupArduinoIde,
    ESP8266BasicSetup,
    SpecificDeviceCodes,
    ExampleCodes,
    AccountSetting,
    FeatureSetting,
    NotFound,
};
