import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbCircleDashed } from 'react-icons/tb';
import { BsMusicPlayerFill } from 'react-icons/bs';
import { FiMonitor } from 'react-icons/fi';
import { RiSwitchFill } from 'react-icons/ri';
import { SiConcourse } from 'react-icons/si';
import { GiCeilingLight } from 'react-icons/gi';
import { CgViewSplit } from 'react-icons/cg';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { NETWORKERRORKEY } from '../Data/Constants';
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
import { RiMistLine, RiMoonClearLine } from 'react-icons/ri';

// -----------------------Toastify functions-----------------------//

const toastProperty: any = (color: any) => {
    return {
        position: 'top-right',
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

export const catchError = (error: any) => {
    let errorDetails = (error as any)?.response?.data?.message;
    if (typeof errorDetails === 'object' && errorDetails !== null) {
        Object.keys(errorDetails).forEach(function eachKey(key) {
            displayToastify(
                errorDetails[key],
                TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        });
    } else {
        if (errorDetails) {
            displayToastify(
                errorDetails,
                TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        } else {
            displayToastify(
                NETWORKERRORKEY,
                TOASTIFYCOLOR.LIGHT,
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
            icon = <SiConcourse />;
            break;
        case 'SWITCH':
            icon = <RiSwitchFill />;
            break;
        case 'AC':
            icon = <CgViewSplit />;
            break;
        case 'TV':
            icon = <FiMonitor />;
            break;
        case 'MUSIC':
            icon = <BsMusicPlayerFill />;
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
    return Math.round(result);
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

// ----------------- notification color --------------------- //

// export const setNotificationColor = (color: string) => {
//     localStorage.setItem(NOTIFICATIONCOLORKEY, color);
// };

// export const getNotificationColor = (): string | number | undefined | null=> {
//   return localStorage.getItem(NOTIFICATIONCOLORKEY);
// };

// export const getNotificationColor = (): any => {
//     return localStorage.getItem(NOTIFICATIONCOLORKEY);
// };
