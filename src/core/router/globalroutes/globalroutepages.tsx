import React from 'react';

// -------------------- Core Application Components -------------------- //
const CoreApplication = React.lazy(
    () => import('../../../features/dashboard/pages/coreapplication/coreapplication'),
);
const DashBoard = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/dashboard/dashboard'),
);
const Chat = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/chat/chat'),
);
const Play = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/play/play'),
);
const Setting = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/setting/setting'),
);
const DeviceRoom = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/deviceroom/deviceroom'),
);
const Connection = React.lazy(
    () => import('../../../features/dashboard/components/coreapplication/connection/connection'),
);

const Overview = React.lazy(
    () =>
        import(
            '../../../features/dashboard/components/coreapplication/connection/overview/overview'
        ),
);

const ArduinoIde = React.lazy(
    () =>
        import(
            '../../../features/dashboard/components/coreapplication/connection/arduinoide/arduinoide'
        ),
);

// -------------------- Profile Components -------------------- //
const ProfilePage = React.lazy(() => import('../../../features/profile/pages/profileconfig/profileconfig'));
const AddProfile = React.lazy(
    () => import('../../../features/profile/components/profileconfig/add/add'),
);
const SelectProfile = React.lazy(
    () => import('../../../features/profile/components/profileconfig/select/select'),
);

// -------------------- Authentication Components -------------------- //
const Home = React.lazy(() => import('../../../features/dashboard/components/coreappcomponents/widgets/spotify/expand/home/home'));
const SignInSignUp = React.lazy(() => import('../../../features/auth/pages/signup/signup'));

// -------------------- Miscellaneous Components -------------------- //
const NotFound = React.lazy(() => import('../../../features/home/pages/notfound/notfound'));

// -------------------- About Components -------------------- //
const About = React.lazy(() => import('../../../features/home/pages/about/about'));

// Export all components
export {
    About, AddProfile, ArduinoIde, Chat, Connection, CoreApplication,
    DashBoard, DeviceRoom, Home, NotFound, Overview, Play, ProfilePage, SelectProfile, Setting, SignInSignUp
};
