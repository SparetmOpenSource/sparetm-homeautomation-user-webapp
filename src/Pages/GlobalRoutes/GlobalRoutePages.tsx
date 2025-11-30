import React from 'react';

// -------------------- Core Application Components -------------------- //
const CoreApplication = React.lazy(
    () => import('../CoreApplication/CoreApplication'),
);
const DashBoard = React.lazy(
    () => import('../../Components/CoreApplication/DashBoard/DashBoard'),
);
const Chat = React.lazy(
    () => import('../../Components/CoreApplication/Chat/Chat'),
);
const Play = React.lazy(
    () => import('../../Components/CoreApplication/Play/Play'),
);
const Setting = React.lazy(
    () => import('../../Components/CoreApplication/Setting/Setting'),
);
const DeviceRoom = React.lazy(
    () => import('../../Components/CoreApplication/DeviceRoom/DeviceRoom'),
);
const Connection = React.lazy(
    () => import('../../Components/CoreApplication/Connection/Connection'),
);

const Overview = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/Connection/Overview/Overview'
        ),
);

const ArduinoIde = React.lazy(
    () =>
        import(
            './../../Components/CoreApplication/Connection/ArduinoIde/ArduinoIde'
        ),
);

// -------------------- Profile Components -------------------- //
const ProfilePage = React.lazy(() => import('../ProfileConfig/ProfileConfig'));
const AddProfile = React.lazy(
    () => import('../../Components/ProfileConfig/Add/Add'),
);
const SelectProfile = React.lazy(
    () => import('../../Components/ProfileConfig/Select/Select'),
);

// -------------------- Authentication Components -------------------- //
const Home = React.lazy(() => import('../Home/Home'));
const SignInSignUp = React.lazy(() => import('../SignUp/SignUp'));

// -------------------- Miscellaneous Components -------------------- //
const NotFound = React.lazy(() => import('../NotFound/NotFound'));

// -------------------- About Components -------------------- //
const About = React.lazy(() => import('../About/About'));

// Export all components
export {
    Home,
    SignInSignUp,
    ProfilePage,
    AddProfile,
    SelectProfile,
    CoreApplication,
    DashBoard,
    Chat,
    Play,
    Setting,
    DeviceRoom,
    Connection,
    Overview,
    ArduinoIde,
    NotFound,
    About,
};
