import { useEffect } from 'react';
import {
    MdBrightness4,
    MdBrightness7,
    MdBrightnessLow,
    MdBrightnessMedium,
} from 'react-icons/md';

export const RootUrl = {
    authMS: 'http://localhost:8085',
};
export const APPNAME = 'OpenBridge';
export const TOKEN = 'token';
export const PROFILE = 'profile';
export const PROFILEID = 'profileId';
export const ADMIN = 'admin';
export const NETWORKERRORKEY = 'Network Error, please try again later';
// --- //

export const APPTOKENKEY = 'appToken';
export const APPPROFILEKEY = 'appProfile';
export const OFFLINETESTUSERNAMEKEY = 'offlineTestUserName';
export const OFFLINETESTPASSWORDKEY = 'offlineTestPassword';
export const APPUSERKEY = 'appUser';
export const PROFILEIDKEY = 'profileId';
export const PROFILENAMEKEY = 'profileName';
export const NOTIFICATIONCOLORKEY = 'notificationColor';

export const RoutePath = {
    Home: '/',
    About: '/about',
    Auth: '/auth',
    // -------------- //
    ProfileConfig: '/profileconfig',
    AddProfileConfig: '/profileconfig/add',
    SelectProfileConfig: '/profileconfig/select',
    // --------------- //
    CoreApplication: '/app',
    Dashboard: 'dashboard',
    Dashboard_Todo: 'segment/todo',
    Dashboard_Device_Status: 'segment/status',
    Device_Status: '/status',
    //--//
    CoreApplication_Room: '/app/room',

    ///-select below-///
    CoreApplication_Dashboard: '/app/dashboard/segment',
    CoreApplication_Play: '/app/play',
    CoreApplication_Docs: '/app/connection/docs',
    CoreApplication_Setting: '/app/setting',

    // Core app route

    // Internal dashboard routes

    // Internal dashboard routes
    DeviceRoom: 'room/:type',
    Play: 'play',
    // Setting routes
    Setting: 'setting',
    Setting_Account: 'account',
    Setting_Features: 'features',
    // Connection routes
    Connection: 'connection',
    GettingStartedDocs: 'docs/getting-started',
    GettingStartedwithEsp8266Docs: 'docs/esp8266',
    GettingStartedwithArduinoIdeDocs: 'docs/arduino',
    Esp8266SpecificDeviceCodeDocs: 'docs/device',
    CodeExamplesDocs: 'docs/code-examples',
};

export const home_contact_social_list = [
    {
        id: 1,
        name: 'GitHub',
        href: 'https://github.com/SparetmOpenSource',
    },
    {
        id: 2,
        name: 'Instagram',
        href: 'https://www.instagram.com/shubham_tales/',
    },
    {
        id: 3,
        name: 'Contact us',
        href: 'https://www.linkedin.com/in/sparetm',
    },
];

// ------------------Home signIn/SignUp Form------------------------//

export const useMountEffect = (fun: any, dep: any) => useEffect(fun, [dep]); // eslint-disable-line react-hooks/exhaustive-deps

// -------------------- core app constant ----------------------- //

export const weather_quote_constant = {
    fetch_delay_time: 1800000, //1000 * 60 * 30 = 1800000
    quote_char_limit: 70,
};

export const spotify_refresh_playback_constant = {
    play_back_fetch_delay_time: 3000, //1000 * 3 = 3000
    queue_fetch_delay_time: 4000, //1000 * 3 = 3000
};

// export let Current_Date_Time = new Date().toLocaleDateString('en-us', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
// });

export const Current_Date_Time = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
});
// ----------------- profile config constant ------------------ //

export const ProfileConfigTypography = {
    form_header: 'Hi, Creative',
    form_subHeader: "Let's create your home with the basic details.",
    select_room_error: 'Max 6 rooms can be added',
};

let RoomNamesConst: string[] = [
    'Room',
    'Bathroom',
    'Bedroom',
    'Dining Room',
    'Drawing Room',
    'Hall',
    'Kitchen',
    'Living Room',
    'Master Bedroom',
    'Store Room',
    'Study Room',
];

export const ProfileConfigRoomNames = [
    {
        room_type: RoomNamesConst[0],
        value: RoomNamesConst[0],
        label: RoomNamesConst[0],
    },
    {
        room_type: RoomNamesConst[1],
        value: RoomNamesConst[1],
        label: RoomNamesConst[1],
    },
    {
        room_type: RoomNamesConst[2],
        value: RoomNamesConst[2],
        label: RoomNamesConst[2],
    },
    {
        room_type: RoomNamesConst[3],
        value: RoomNamesConst[3],
        label: RoomNamesConst[3],
    },
    {
        room_type: RoomNamesConst[4],
        value: RoomNamesConst[4],
        label: RoomNamesConst[4],
    },
    {
        room_type: RoomNamesConst[5],
        value: RoomNamesConst[5],
        label: RoomNamesConst[5],
    },
    {
        room_type: RoomNamesConst[6],
        value: RoomNamesConst[6],
        label: RoomNamesConst[6],
    },
    {
        room_type: RoomNamesConst[7],
        value: RoomNamesConst[7],
        label: RoomNamesConst[7],
    },
    {
        room_type: RoomNamesConst[8],
        value: RoomNamesConst[8],
        label: RoomNamesConst[8],
    },
    {
        room_type: RoomNamesConst[9],
        value: RoomNamesConst[9],
        label: RoomNamesConst[9],
    },
    {
        room_type: RoomNamesConst[10],
        value: RoomNamesConst[10],
        label: RoomNamesConst[10],
    },
];

export const SelectColorStyles = {
    // menuList: (styles: any) => ({
    //     ...styles,
    //     background: '#272629',
    //     color: 'lavender', //color after opening dropdown
    // }),
    // option: (styles: any, { isFocused, isSelected }: any) => ({
    //     ...styles,
    //     background: isFocused
    //         ? 'rgb(194,231,255)'
    //         : isSelected
    //         ? '#9DE9F4'
    //         : undefined,
    //     color: isFocused ? 'black' : isSelected ? 'black' : undefined,
    //     zIndex: 1,
    // }),
    // menu: (base: any) => ({
    //     ...base,
    //     zIndex: 100,
    //     background: 'blue',
    // }),

    menuList: (styles: any) => ({
        ...styles,
        background: '#272629',
        color: 'lavender', //color after opening dropdown
    }),

    control: (baseStyles: any, state: any) => ({
        ...baseStyles,
        borderColor: state.isFocused ? 'orange' : 'grey',
        backgroundColor: 'black',
        color: 'yellow',
    }),
};

// ------------------ backdrop ------------------- //

export const SpringSuspense = {
    hidden: {
        y: '-100vh',
        opacity: 0,
        transform: 'scale(0) rotateX(-360deg)',
    },
    visible: {
        y: '0vh',
        opacity: 1,
        transition: {
            duration: 0.2,
            type: 'spring',
            damping: 15,
            stiffness: 500,
        },
    },
    exit: {
        y: '-100vh',
        opacity: 0,
    },
};

export const deviceTypeArr = ['gadget', 'appliance'];

export const colorNotificationStatus = ['success', 'error'];

export const ChangeBrightnessIcon = (brightness: any) => {
    let icon: any;
    if (brightness >= 0 && brightness < 20) {
        icon = <MdBrightnessLow />;
    } else if (brightness >= 20 && brightness < 40) {
        icon = <MdBrightness4 />;
    } else if (brightness >= 40 && brightness < 70) {
        icon = <MdBrightnessMedium />;
    } else if (brightness >= 70 && brightness <= 100) {
        icon = <MdBrightness7 />;
    }
    return icon;
};

export const GadgetRgbDefaultColor = ['177', '216', '213', '0.9', 'regular'];

export const LandscapeSizeL = ['min(90%, 800px)', 'clamp(50%, 1500px, 92%)'];
export const LandscapeSizeM = ['min(60%, 600px)', 'clamp(60%, 700px, 90%)'];
export const LandscapeSizeS = ['min(50%, 300px)', 'clamp(50%, 700px, 90%)'];
export const HorizontalSize = ['min(90%, 1200px)', 'clamp(40%, 300px, 90%)'];
export const FullScreenSize = ['100%', '100%'];

export const socketUrlPostFix = '/api/v1/socket/data/update';
export const toClientMqttSocketTopic = '/to/client/update/device/mqtt/data';
export const toClientNotificationSocketTopic =
    '/to/client/update/notification/data';
export const toServerSocketTopic = '/to/server/update/device/mqtt/data';


export const spotifyToken = 'spotify_access_token';
export const spotifyRefreshToken = 'spotify_refresh_token';
export const spotifyCodeVerifier = 'code_verifier';
export const spotifyTokenFetched = 'has_fetched_spotify_access_token';
export const spotifyTokenFetchedTime = 'has_fetched_spotify_access_token_time';


