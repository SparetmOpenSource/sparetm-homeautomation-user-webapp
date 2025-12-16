import { useEffect } from 'react';
import {
    MdBrightness4,
    MdBrightness7,
    MdBrightnessLow,
    MdBrightnessMedium,
} from 'react-icons/md';

// export const RootUrl = {
//     authMS: 'http://localhost:8085',
// };
export const APPNAME = 'OpenBridge';
export const TOKEN = 'token';
export const PROFILE = 'profile';
export const PROFILEID = 'profileId';
export const ADMIN = 'admin';
export const NETWORKERRORKEY = 'Network Error, please try again later';
// --- //

export const PROFILEIDKEY = 'profileId';
export const PROFILENAMEKEY = 'profileName';
export const ID = 'Id';

export const USE_ACTIVE_SETTINGS = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'];

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
    Device_Todo: '/todo',
    //--//
    CoreApplication_Room: '/app/room',

    ///-select below-///
    CoreApplication_Dashboard: '/app/dashboard/segment',
    CoreApplication_Play: '/app/play',
    CoreApplication_Chat: '/app/chat',
    CoreApplication_Docs: '/app/connection/docs',
    CoreApplication_Setting: '/app/setting',

    // Core app route
    // Internal dashboard routes
    DeviceRoom: 'room/:type',
    Play: 'play',
    Chat: 'chat',
    // Setting routes
    Setting: 'setting',
    Setting_Account: 'account',
    Setting_Features: 'features',
    // Connection routes
    Connection: 'connection',
    GettingStartedDocs: 'docs/getting-started',
    GettingStartedwithEsp8266Esp32Docs: 'docs/esp8266-esp32',
    GettingStartedwithArduinoIdeDocs: 'docs/arduino',
    Esp8266SpecificDeviceCodeDocs: 'docs/device',
    CodeExamplesDocs: 'docs/code-examples',
    HardwareConnection: 'docs/hardware-connection',
};

export const home_contact_social_list = [
    {
        id: 1,
        name: 'GitHub',
        href: 'https://github.com/SparetmOpenSource',
    },
    {
        id: 2,
        name: 'Contact us',
        href: 'https://www.linkedin.com/in/shubham2601',
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
    play_back_fetch_delay_time: 2000, //1000 * 2 = 3000
};

export const Current_Date_Time = new Date().toLocaleString(undefined, {
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
    'Bedroom',
    'Master Bedroom',
    'Living Room',
    'Kitchen',
    'Bathroom',
    'Dining Room',
    'Hall',
    'Drawing Room',
    'Guest Room',
    'Study Room',
    'Home Office',
    'Store Room',
    'Utility Room',
    'Basement',
    'Game Room',
    'Library',
    'Music Room',
    'Room-1',
    'Room-2',
    'Room-3',
    'Room-4',
    'Room-5',
    'Room-6',
];

export const ProfileConfigRoomNames = RoomNamesConst.map((roomName) => ({
    room_type: roomName,
    value: roomName,
    label: roomName,
}));

export const NONPREMIUMROOMCOUNT = 6;

export const SelectColorStyles = {
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
        scale: 0.8,
        rotateX: -90,
        willChange: 'transform, opacity',
    },
    visible: {
        y: '0vh',
        opacity: 1,
        scale: 1,
        rotateX: 0,
        willChange: 'transform, opacity',
        transition: {
            type: 'spring',
            damping: 12, // less damping = softer bounce
            stiffness: 180, // lower stiffness = smoother
            mass: 0.8, // adds subtle weight to bounce
            duration: 0.6, // smoother entry
            velocity: 0.8,
        },
    },
    exit: {
        y: '-10vh',
        opacity: 0,
        scale: 0.95,
        rotateX: -15,
        willChange: 'transform, opacity',
        transition: {
            type: 'tween',
            ease: 'easeInOut', // smooth, non-jumpy fade
            duration: 0.4,
        },
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
export const LandscapeSizeM = ['min(70%, 500px)', 'clamp(60%, 600px, 90%)'];
// export const LandscapeSizeM = ['min(60%, 600px)', 'clamp(60%, 700px, 90%)'];
export const LandscapeSizeS = ['min(50%, 300px)', 'clamp(50%, 700px, 90%)'];
export const HorizontalSize = ['min(90%, 1200px)', 'clamp(40%, 300px, 90%)'];
export const PolicyModalSize = ['min(85vh, 650px)', 'min(95%, 500px)'];
export const FullScreenSize = ['100%', '100%'];

export const socketUrlPostFix = '/api/v1/socket/data/update';
export const WEBSOCKET_TOPIC_EVENTS = '/topic/events';
export const toClientNotificationSocketTopic =
    '/to/client/update/notification/data';
export const toServerSocketTopic = '/to/server/update/device/mqtt/data';

export const spotifyToken = 'spotify_access_token';
export const spotifyAccountType = 'spotify_account_type';
export const spotifyRefreshToken = 'spotify_refresh_token';
export const spotifyCodeVerifier = 'spotify_code_verifier_global';
export const spotifyTokenFetched = 'has_fetched_spotify_access_token';
export const spotifyTokenFetchedTime = 'has_fetched_spotify_access_token_time';
export const spotifyNonPremiumWarning =
    'This feature is only available for spotify premium members.';
export const spotifyUserNotRegisteredWarning =
    'Your Spotify account is not authorized to use this web application. Please contact the developer to request access.';
export const spotifyNoPlayableDeviceWarning =
    'Oops! No active Spotify device is playing music right now.';
export const spotifyAlbumAddition = 'Added album to your collection.';
export const spotifyQueueAddition = 'Added track to your queue.';

// Global localStorage keys (with _global suffix for Redux persistence)
export const ADMIN_GLOBAL = `${ADMIN}_global`;
export const PROFILE_GLOBAL = `${PROFILE}_global`;
export const TOKEN_GLOBAL = `${TOKEN}_global`;
export const PROFILEID_GLOBAL = `${PROFILEID}_global`;

export const SPOTIFY_TOKEN_GLOBAL = `${spotifyToken}_global`;
export const SPOTIFY_REFRESH_TOKEN_GLOBAL = `${spotifyRefreshToken}_global`;
export const SPOTIFY_ACCOUNT_TYPE_GLOBAL = `${spotifyAccountType}_global`;
export const SPOTIFY_TOKEN_FETCHED_GLOBAL = `${spotifyTokenFetched}_global`;
export const SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL = `${spotifyTokenFetchedTime}_global`;
export const SPOTIFY_CODE_VERIFIER = spotifyCodeVerifier; // sessionStorage key (no _global suffix)

export const ITEMPERPAGE = 20;

// backdropIds

export const SIDE_NAV_CONFIRMATION_FOR_PROFILE_CHANGE =
    'sideNavigation-confirmationModal-for-profile-change';
export const SIDE_NAV_CONFIRMATION_FOR_LOGOUT_PROFILE =
    'sideNavigation-confirmationModal-for-logout-profile';
export const CORE_APP_ADD_DEVICE = 'coreApplication-addDevice';
export const WEATHER_EXPAND = 'weather-expandModal';
export const SPOTIFY_ACTIVE_EXPAND = 'spotifyActive-expandModal';
export const SPOTIFY_EXPAND_ALBUM_DELETE_CONFIRMATION =
    'spotifyExpand-deleteAlbumConfirmation';
export const SPOTIFY_EXPAND_LOGOUT_CONFIRMATION =
    'spotifyExpand-logoutConfirmation';
export const SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION =
    'spotifyExpand-addAlbumConfirmation';
export const SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION =
    'spotifyExpand-addTrackToQueueConfirmation';
export const RGB_GADGET_EXPAND_INFO = 'rgbGadgetExpandInfo';
export const RGB_GADGET_EXPAND = 'rgbGadgetExpand';
export const DEVICE_CARD_DELETE_DEVICE_CONFIRMATION =
    'deviceCard-deleteDeviceConfirmation';
export const RGB_GADGET_DELETE_DEVICE_SAVED_DATA =
    'rgbGadget-deleteDevice-savedData';
export const APPLIANCE_EXPAND = 'applianceExpand';
export const GLOBAL_SCREEN_SAVER = 'global-screen-saver';
export const GLOBAL_NOTIFICATION = 'global-notification';
export const DELETING_TODO_LIST = 'deleteToDo';
export const ADD_TODO_LIST = 'addToDo';
export const EDIT_TODO_LIST = 'editToDo';
export const POLICY_MODAL = 'policy-modal';
export const MQTT_CONFIG_MODAL = 'mqtt-config-modal';

export const PAGE_LOGGER = {
    home_page: 'Pages/Home/Home.tsx',
};

export const ERROR_MSG = 'Something went wrong!';
export const DATA_NOT_FOUND_MSG = 'Data not found!';
export const MQTT_ERROR_PREFIX = 'MQTT configuration missing for tenant';
export const MQTT_ERROR_USER_MESSAGE =
    'Device configuration is missing. Please configure your MQTT credentials in Settings.';
export const IS_MQTT_CONFIGURED_KEY = 'is_mqtt_configured';

export const BACKGROUND_BLINK_SETTING = 'background_blink_settings';


export const NOTIFICATION_SOUNDS_ENABLED_KEY = 'notificationSoundsEnabled';
export const NOTIFICATION_POSITION_KEY = 'notificationPosition';
export const BLINK_NOTIFICATIONS_ENABLED_KEY = 'blinkNotificationsEnabled';
export const SCREENSAVER_ENABLED_KEY = 'screensaverEnabled';
export const SCREENSAVER_TIMEOUT_KEY = 'screensaverTimeout';
export const SECURITY_LOCK_ENABLED_KEY = 'securityLockEnabled';
export const SECURITY_LOCK_TIMEOUT_KEY = 'securityLockTimeout';
export const ACKNOWLEDGED_NOTIFICATIONS_KEY = 'acknowledged_notifications';
export const PAGE_TRANSITIONS_ENABLED_KEY = 'pageTransitionsEnabled';
export const DARK_THEME_KEY = 'darkTheme';
export const COOKIES_PREFERENCES_KEY = 'cookies_preferences';
export const WEBSOCKET_ENABLED_KEY = 'websocket_enabled_global';
