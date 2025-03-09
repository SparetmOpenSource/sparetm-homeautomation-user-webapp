import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbCircleDashed } from 'react-icons/tb';
import { BsMusicPlayerFill } from 'react-icons/bs';
import { GiCeilingLight } from 'react-icons/gi';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import {
    NETWORKERRORKEY,
    RoutePath,
    spotifyCodeVerifier,
    spotifyRefreshToken,
    spotifyToken,
    spotifyTokenFetched,
    spotifyTokenFetchedTime,
} from '../Data/Constants';
import { GiBoatPropeller } from 'react-icons/gi';
import { GiWashingMachine } from 'react-icons/gi';
import { TbMicrowave } from 'react-icons/tb';
import { LuRefrigerator } from 'react-icons/lu';
import { GiVacuumCleaner } from 'react-icons/gi';
import { GiToaster } from 'react-icons/gi';
import { PiHardDriveDuotone } from 'react-icons/pi';
import { TbFreezeRow } from 'react-icons/tb';
import {
    BsSunFill,
    BsCloudSunFill,
    BsCloudFill,
    BsCloudsFill,
    BsCloudRainFill,
    BsCloudRainHeavyFill,
    BsFillCloudLightningRainFill,
    BsSnow2,
} from 'react-icons/bs';
import { TbAirConditioning } from 'react-icons/tb';
import { SiSocketdotio } from 'react-icons/si';
import { TbDeviceTvOld } from 'react-icons/tb';
import { RiMistLine, RiMoonClearLine } from 'react-icons/ri';

// -----------------------Toastify functions-----------------------//

const toastProperty: any = (color: any) => {
    return {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: color, // light, dark, colored
        transition: Bounce,
    };
};

// status -> "info","success","warn","error"
export const displayToastify: any = (message: any, color: any, status: any) => {
    if (status === TOASTIFYSTATE.INFO) {
        toast.info(message, toastProperty(color));
    } else if (status === TOASTIFYSTATE.SUCCESS) {
        toast.success(message, toastProperty(color));
    } else if (status === TOASTIFYSTATE.WARN) {
        toast.warn(message, toastProperty(color));
    } else {
        toast.error(message, toastProperty(color));
    }
};

// ---------------- Error inside catch -------------------- //

export const catchError = (error: any, darkTheme: any) => {
    let errorDetails = (error as any)?.response?.data?.message;
    if (typeof errorDetails === 'object' && errorDetails !== null) {
        Object.keys(errorDetails).forEach(function eachKey(key) {
            displayToastify(
                errorDetails[key],
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        });
    } else {
        if (errorDetails) {
            displayToastify(
                errorDetails,
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        } else {
            displayToastify(
                NETWORKERRORKEY,
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        }
    }
};

// ----------------- core app ----------------------- //

export const changeWeatherIcon = (iconCode: string) => {
    let icon: any;
    switch (iconCode) {
        case '01n':
            icon = <RiMoonClearLine />;
            break;
        case '01d':
            icon = <BsSunFill />;
            break;
        case '02d':
        case '02n':
            icon = <BsCloudSunFill />;
            break;
        case '03d':
        case '03n':
            icon = <BsCloudFill />;
            break;
        case '04d':
        case '04n':
            icon = <BsCloudsFill />;
            break;
        case '09d':
        case '09n':
            icon = <BsCloudRainFill />;
            break;
        case '10d':
        case '10n':
            icon = <BsCloudRainHeavyFill />;
            break;
        case '11d':
        case '11n':
            icon = <BsFillCloudLightningRainFill />;
            break;
        case '13d':
        case '13n':
            icon = <BsSnow2 />;
            break;
        case '50d':
        case '50n':
            icon = <RiMistLine />;
            break;
        default:
            icon = '';
            break;
    }
    return icon;
};

export const appliance = [
    {
        label: 'Light',
        value: 'appliance/light',
        remote: false,
    },
    {
        label: 'Fan',
        value: 'appliance/fan',
        remote: true,
    },
    {
        label: 'Switch',
        value: 'appliance/switch',
        remote: false,
    },
    {
        label: 'Television',
        value: 'appliance/tv',
        remote: true,
    },
    {
        label: 'Air Conditioner',
        value: 'appliance/ac',
        remote: true,
    },
    {
        label: 'Music',
        value: 'appliance/music',
        remote: false,
    },
    // {
    //   label: "Freezer",
    //   value: "appliance/freezer",
    //   remote: false,
    // },
    // {
    //   label: "Dishwasher",
    //   value: "appliance/dishwasher",
    //   remote: false,
    // },
    // {
    //   label: "Dryer",
    //   value: "appliance/dryer",
    //   remote: false,
    // },
    // {
    //   label: "Heater",
    //   value: "appliance/heater",
    //   remote: false,
    // },
    // {
    //   label: "Mixer",
    //   value: "appliance/mixer",
    //   remote: false,
    // },
    {
        label: 'Toaster',
        value: 'appliance/toaster',
        remote: false,
    },
    // {
    //   label: "Water Purifier",
    //   value: "appliance/waterPurifier",
    //   remote: false,
    // },
    {
        label: 'Vacuum Cleaner',
        value: 'appliance/vacuumCleaner',
        remote: false,
    },
    {
        label: 'Refrigerator',
        value: 'appliance/refrigerator',
        remote: false,
    },
    {
        label: 'Microwave',
        value: 'appliance/microwave',
        remote: false,
    },
    {
        label: 'Washing Machine',
        value: 'appliance/washingMachine',
        remote: false,
    },
];

export const gadget = [
    {
        label: 'RGB',
        value: 'gadget/rgb',
        remote: false,
    },
];

export const changeDeviceIcon = (device: string) => {
    let icon: any;
    switch (device) {
        case 'RGB':
            icon = <TbCircleDashed />;
            break;
        case 'LIGHT':
            icon = <GiCeilingLight />;
            break;
        case 'FAN':
            icon = <GiBoatPropeller />;
            break;
        case 'SWITCH':
            icon = <SiSocketdotio />;
            break;
        case 'AC':
            icon = <TbAirConditioning />;
            break;
        case 'TV':
            icon = <TbDeviceTvOld />;
            break;
        case 'MUSIC':
            icon = <BsMusicPlayerFill />;
            break;
        // case 'FREEZER':
        //     icon = <TbFreezeRow/>;
        //     break;
        case 'TOASTER':
            icon = <GiToaster />;
            break;
        case 'VACUUMCLEANER':
            icon = <GiVacuumCleaner />;
            break;
        case 'REFRIGERATOR':
            icon = <LuRefrigerator />;
            break;
        case 'MICROWAVE':
            icon = <TbMicrowave />;
            break;
        case 'WASHINGMACHINE':
            icon = <GiWashingMachine />;
            break;
        default:
            icon = '';
            break;
    }
    return icon;
};

export const Spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
};

export const generateRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const ConvertTheRangeToRound = (
    currentValue: any,
    in_min: any,
    in_max: any,
    out_min: any,
    out_max: any,
) => {
    let result =
        ((currentValue - in_min) * (out_max - out_min)) / (in_max - in_min) +
        out_min;
    return Math.round(result);
};

export const ConvertTheRange = (
    currentValue: any,
    in_min: any,
    in_max: any,
    out_min: any,
    out_max: any,
) => {
    let result =
        ((currentValue - in_min) * (out_max - out_min)) / (in_max - in_min) +
        out_min;
    return result;
};

const RgbDeviceAnimation = [
    {
        id: 1,
        name: 'Regular',
        value: 'regular',
        color: 'red',
    },
    {
        id: 2,
        name: 'Spiral',
        value: 'spiral',
        color: 'blue',
    },
    {
        id: 3,
        name: 'Dim',
        value: 'dim',
        color: 'green',
    },
    {
        id: 4,
        name: 'Blur',
        value: 'blur',
        color: 'pink',
    },
];

export const findAnimationBasedColor = (animationType: any) => {
    return RgbDeviceAnimation.filter((el: any) => el.value === animationType)[0]
        .color;
};

export const copyText = async (text: any) => {
    try {
        const toCopy = text;
        await navigator.clipboard.writeText(toCopy);
        toast.info('Code copied!');
    } catch (err) {
        toast.info('Failed to copy: ' + err);
    }
};

// export const imageScrollAnimate = {
//     offscreen: { x: -100, opacity: 0 },
//     onscreen: {
//         x: 0,
//         opacity: 1,
//         rotate: [0, 10, 0],
//         transition: { type: 'spring', bounce: 0.4, duration: 1 },
//     },
// };

// export const textScrollAnimate = {
//     offscreen: { y: 100, opacity: 0 },
//     onscreen: {
//         y: 0,
//         opacity: 1,
//         transition: { type: 'spring', bounce: 0.4, duration: 1 },
//     },
// };

export const logger = (file: string) => {
    const flag: boolean = true;
    if (flag) {
        console.log(`Logging for ${file}...`);
    }
};

export const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            entry.target.classList.add('show-el');
        } else {
            entry.target.classList.remove('show-el');
        }
    });
});

export const doScroll = (paragraphRef: any) => {
    paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};

// export const notificationBackground = (
//     setCount: any,
//     setColor: any,
//     intervalRef: any,
//     notificationModeStatus: any,
// ) => {
//     const notificationCol = notificationModeStatus
//         ? dark_colors?.success
//         : dark_colors?.error;
//     const refId = setInterval(function () {
//         setCount((cnt: any) => {
//             return cnt + 1;
//         });
//         setColor((col: string) => {
//             if (col === notificationCol) {
//                 return 'black';
//             } else {
//                 return notificationCol;
//             }
//         });
//     }, 180);
//     intervalRef.current = refId;
// };

// export const notificationModeChanged = (
//     notificationMode: any,
//     setNotificationMode: any,
//     setNotificationModeStatus: any,
//     notificationModeStatus: boolean,
// ) => {
//     setNotificationMode(!notificationMode);
//     setNotificationModeStatus(notificationModeStatus);
// };

export const reloadPage = () => {
    window.location.reload();
};

export const defaultOnSuccess = () => {};
export const defaultOnError = () => {};

export function getOffsetAndLimit(
    pageNumber: number,
    recordsPerPage: number = 10,
): { offset: number; limit: number } {
    if (pageNumber < 1) {
        throw new Error('Page number must be greater than or equal to 1.');
    }
    if (recordsPerPage < 1) {
        throw new Error('Records per page must be greater than or equal to 1.');
    }
    const offset = (pageNumber - 1) * recordsPerPage;
    const limit = recordsPerPage;
    return { offset, limit };
}

export const resetSpotify = () => {
    localStorage.removeItem(spotifyToken);
    localStorage.removeItem(spotifyRefreshToken);
    sessionStorage.removeItem(spotifyCodeVerifier);
    localStorage.removeItem(spotifyTokenFetched);
    localStorage.removeItem(spotifyTokenFetchedTime);
};

export const spotifyLogout = () => {
    resetSpotify();
};

export const navigateTo = (navigate: any, to: any) => {
    navigate(to);
};

export const uriArray = [`${RoutePath.CoreApplication_Room}`]; //'/app/room'
export const isSearchActive = (uriArray: any, uri: any) => {
    return uriArray?.some((item: any) => item?.includes(uri));
};

export const getFormattedDate = () => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    function getOrdinalSuffix(day: any) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const monthIndex = today.getMonth();
    const monthName = monthNames[monthIndex];
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    const dateString = `${dayOfMonth}${ordinalSuffix} ${monthName}`;
    return dateString;
};

export const invalidateQueries = (queryClient: any, queryKeys: any) => {
    queryKeys.forEach((key: any) => {
        queryClient.invalidateQueries(key);
    });
};

export const executeLinkInNewTab = (url: string, darkTheme: any) => {
    if (url) {
        window.open(url, '_blank');
        // window.open(url, '_self');
    } else {
        displayToastify(
            'URL is not provided or invalid',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    }
};

export const generateCodeChallenge = async () => {
    const generateRandomString = (length: number) => {
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce(
            (acc, x) => acc + possible[x % possible.length],
            '',
        );
    };

    const sha256 = async (plain: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    };

    const base64encode = (input: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    return { codeVerifier, codeChallenge };
};

export const trimTo8Chars = (str: string, lng: number) => {
    if (str?.length <= lng) return str; // No trimming needed
    return str?.slice(0, lng) + '...'; // Trim to 8 chars and add ellipsis
};

export function convertMsToMinutes(progress_ms: number): number {
    const minutes = progress_ms / 1000 / 60;
    return minutes;
}

export const formatTime = (time: any) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');
    return `${minutes}:${seconds}`;
};
