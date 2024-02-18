import { useEffect } from "react";

export const RootUrl = {
    authMS: 'http://localhost:8085',
};

export const AppName = "OpenBridge";
export const NotificationColor =  "rgb(46,52,56)";//"#1F2123"; //  "#CEC7BF";


export const RoutePath = {
    // Home route
    Home: '/',
    About: '/about',
    Auth: '/auth',
    // Profile route
    ProfileConfig: '/profileconfig',
    AddProfileConfig: '/profileconfig/add',
    SelectProfileConfig: '/profileconfig/select',
    // Core app route
    CoreApplication: '/app',
    CoreApplication_Dashboard: '/app/dashboard/segment',
    CoreApplication_Room: '/app/room',
    CoreApplication_Premium_Offer: '/app/premium',
    CoreApplication_Docs: '/app/connection/docs',
    CoreApplication_Setting: '/app/setting',
    // Internal dashboard routes
    Dashboard: 'dashboard',
    Dashboard_Todo: 'segment/todo',
    Dashboard_Device_Status: 'segment/status',
    // Internal dashboard routes
    DeviceRoom: 'room/:type',
    Premium: 'premium',
    Setting: 'setting',
    Connection: 'connection',
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
        href: 'https://www.instagram.com/_sparetm/',
    },
    {
        id: 3,
        name: 'Contact us',
        href: 'https://www.linkedin.com/in/sparetm',
    },
];

// ------------------Home signIn/SignUp Form------------------------//

export const useMountEffect = (fun: any, dep:any) => useEffect(fun, [dep]);  // eslint-disable-line react-hooks/exhaustive-deps

// -------------------- core app constant ----------------------- //

export const todoStatus = [
    'STATUS_NEW',
    'STATUS_INPROGRESS',
    'STATUS_COMPLETED',
];

export const weather_quote_constant = {
    fetch_delay_time: 1000000000, //15x60x1000 = 900000
    quote_char_limit: 70,
};

export let Current_Date_Time = new Date().toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});


// ----------------- profile config constant ------------------ //

export const ProfileConfigTypography = {
    form_header: 'Hi, Creative',
    form_subHeader: "Let's create your home with the basic details.",
    select_room_error: 'Max 6 rooms can be added',
};

let RoomNamesConst: string[] = ['Bathroom','Bedroom','Dining Room','Drawing Room','Hall','Kitchen','Living Room','Master Bedroom','Room','Store Room','Study Room'];

export const ProfileConfigRoomNames = [
    { room_type: RoomNamesConst[0], value: RoomNamesConst[0], label: RoomNamesConst[0]},
    { room_type: RoomNamesConst[1], value: RoomNamesConst[1], label: RoomNamesConst[1] },
    { room_type: RoomNamesConst[2], value: RoomNamesConst[2], label: RoomNamesConst[2] },
    { room_type: RoomNamesConst[3], value: RoomNamesConst[3], label: RoomNamesConst[3] },
    { room_type: RoomNamesConst[4], value: RoomNamesConst[4], label:RoomNamesConst[4] },
    { room_type: RoomNamesConst[5], value:RoomNamesConst[5], label: RoomNamesConst[5]},
    { room_type: RoomNamesConst[6], value: RoomNamesConst[6], label: RoomNamesConst[6]},
    {
        room_type:RoomNamesConst[7],
        value: RoomNamesConst[7],
        label: RoomNamesConst[7],
    },
    { room_type: RoomNamesConst[8], value: RoomNamesConst[8], label:RoomNamesConst[8] },
    { room_type:RoomNamesConst[9], value: RoomNamesConst[9], label:RoomNamesConst[9] },
    { room_type: RoomNamesConst[10], value:RoomNamesConst[10], label:RoomNamesConst[10] },
];

export const SelectColorStyles = {
    menuList: (styles: any) => ({
        ...styles,
        background: '#272629',
        color: 'lavender', //color after opening dropdown
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
        ...styles,
        background: isFocused ? 'pink' : isSelected ? '#9DE9F4' : undefined,
        color: isFocused ? 'black' : isSelected ? 'black' : undefined,
        zIndex: 1,
    }),
    menu: (base: any) => ({
        ...base,
        zIndex: 100,
        background: 'blue',
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

