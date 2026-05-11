import React from 'react';

// -------------------- Core Application Components -------------------- //
const CoreApplication = React.lazy(
    () => import('../../../features/dashboard/pages/coreapplication/Coreapplication'),
);
const DashBoard = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/dashboard/Dashboard'),
);
const Chat = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/chat/Chat'),
);
const Play = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/play/Play'),
);
const Setting = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/setting/Setting'),
);
const DeviceRoom = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/deviceroom/Deviceroom'),
);
const Connection = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/connection/Connection'),
);

const Overview = React.lazy(
    () =>
        import(
            '../../../features/dashboard/components/coreapplication/connection/overview/Overview'
        ),
);

const ArduinoIde = React.lazy(
    () =>
        import(
            '../../../features/dashboard/components/coreapplication/connection/arduinoide/Arduinoide'
        ),
);

// -------------------- Profile Components -------------------- //
const ProfilePage = React.lazy(() => import('../../../features/profile/pages/profileconfig/Profileconfig'));
const AddProfile = React.lazy(
    () => import('../../../features/profile/components/profileconfig/add/Add'),
);
const SelectProfile = React.lazy(
    () => import('../../../features/profile/components/profileconfig/select/Select'),
);

// -------------------- Authentication Components -------------------- //
const Home = React.lazy(() => import('../../../features/dashboard/components/coreappcomponents/widgets/spotify/expand/home/Home'));
const SignInSignUp = React.lazy(() => import('../../../features/auth/pages/signup/Signup'));

// -------------------- Miscellaneous Components -------------------- //
const NotFound = React.lazy(() => import('../../../features/home/pages/notfound/Notfound'));

// -------------------- About Components -------------------- //
const About = React.lazy(() => import('../../../features/home/pages/about/About'));

// Export all components
export {
    About, AddProfile, ArduinoIde, Chat, Connection, CoreApplication,
    DashBoard, DeviceRoom, Home, NotFound, Overview, Play, ProfilePage, SelectProfile, Setting, SignInSignUp
};
