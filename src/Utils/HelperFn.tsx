import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    TbMicrowave,
    TbAirConditioning,
    TbDeviceTvOld,
    TbFreezeRow,
} from 'react-icons/tb';
import {
    BsMusicPlayerFill,
    BsSunFill,
    BsCloudSunFill,
    BsCloudFill,
    BsCloudsFill,
    BsCloudRainFill,
    BsCloudRainHeavyFill,
    BsFillCloudLightningRainFill,
    BsSnow2,
} from 'react-icons/bs';
import {
    GiCeilingLight,
    GiBoatPropeller,
    GiWashingMachine,
} from 'react-icons/gi';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import {
    NETWORKERRORKEY,
    RoutePath,
    SPOTIFY_CODE_VERIFIER,
    spotifyNonPremiumWarning,
    spotifyNoPlayableDeviceWarning,
    spotifyUserNotRegisteredWarning,
    SPOTIFY_TOKEN_GLOBAL,
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
    SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY,
    SECURITY_LOCK_ENABLED_KEY,
    SECURITY_LOCK_TIMEOUT_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY,
    NOTIFICATION_POSITION_KEY,
    BLINK_NOTIFICATIONS_ENABLED_KEY,
    BACKGROUND_BLINK_SETTING,
    ACKNOWLEDGED_NOTIFICATIONS_KEY,
    PAGE_TRANSITIONS_ENABLED_KEY,
    PROFILE_GLOBAL,
    PROFILEID_GLOBAL,
    TOKEN_GLOBAL,
    ADMIN_GLOBAL,
    WEBSOCKET_ENABLED_KEY,
    IS_MQTT_CONFIGURED_KEY,
} from '../Data/Constants';
import { LuRefrigerator } from 'react-icons/lu';
import { SiSocketdotio, SiNano } from 'react-icons/si';
import { RiMistLine, RiMoonClearLine } from 'react-icons/ri';
import { BiSolidWasher } from 'react-icons/bi';
import { setBlinkColor, triggerBlink } from '../Features/Blink/BlinkSlice';
import { getNotificationConfig } from './NotificationConfig';
import { removeItem, getItem } from '../Hooks/UseLocalStorage';

// Scalable key lists for cleanup
const PROFILE_SWITCH_KEYS = [
    PROFILE_GLOBAL,
    PROFILEID_GLOBAL,
    ACKNOWLEDGED_NOTIFICATIONS_KEY,
    BACKGROUND_BLINK_SETTING,
    BLINK_NOTIFICATIONS_ENABLED_KEY,
    NOTIFICATION_POSITION_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY,
    PAGE_TRANSITIONS_ENABLED_KEY,
    SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY,
    SECURITY_LOCK_ENABLED_KEY,
    SECURITY_LOCK_TIMEOUT_KEY,
    WEBSOCKET_ENABLED_KEY,
];

const LOGOUT_KEYS = [
    TOKEN_GLOBAL,
    ADMIN_GLOBAL,
    IS_MQTT_CONFIGURED_KEY,
];

const SPOTIFY_KEYS = [
    SPOTIFY_TOKEN_GLOBAL,
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
];



export const removeLocalStorageKeys = (keys: string[]) => {
    keys.forEach((key) => removeItem(key));
};

export const clearLocalStorageOnProfileSwitch = () => {
    removeLocalStorageKeys(PROFILE_SWITCH_KEYS);
};

export const resetSpotify = () => {
    removeLocalStorageKeys(SPOTIFY_KEYS);
    sessionStorage.removeItem(SPOTIFY_CODE_VERIFIER);
};

export const clearLocalStorageOnLogout = () => {
    clearLocalStorageOnProfileSwitch();
    removeLocalStorageKeys(LOGOUT_KEYS);
    resetSpotify(); // Clears all Spotify keys including sessionStorage
    
    // Explicitly preserved keys:
    // - REACT_QUERY_DEVTOOLS_SORT_FN_KEY
    // - darkTheme
};

export const spotifyLogout = () => {
    resetSpotify();
};

// -----------------------Sound Helper-----------------------//
// Global AudioContext
const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
let audioCtx: AudioContext | null = null;
let hasInteracted = false;

// Initialize context lazily
const initAudio = () => {
    if (!audioCtx && AudioContext) {
        audioCtx = new AudioContext();
    }
};

// Listen for interaction to unlock audio
const enableSound = () => {
    hasInteracted = true;
    initAudio();
    
    if (audioCtx) {
        // 1. Resume context
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                console.log("AudioContext resumed by user interaction.");
            });
        }

        // 2. KEEP-ALIVE HACK: Play a silent oscillator forever
        // This prevents the browser from suspending the context again.
        try {
            const silentOsc = audioCtx.createOscillator();
            const silentGain = audioCtx.createGain();
            silentOsc.type = 'sine';
            silentOsc.frequency.value = 0.01; // Almost zero Hz
            silentGain.gain.value = 0.001; // Almost zero volume
            
            silentOsc.connect(silentGain);
            silentGain.connect(audioCtx.destination);
            silentOsc.start();
            console.log("Audio Keep-Alive started (Silent Oscillator).");
        } catch (e) {
            console.error("Keep-Alive failed", e);
        }
    }
    
    // Remove listeners
    window.removeEventListener('click', enableSound, true);
    window.removeEventListener('keydown', enableSound, true);
    window.removeEventListener('touchstart', enableSound, true);
};

if (typeof window !== 'undefined') {
    // Use Capture Phase (true) to catch events before they are stopped
    window.addEventListener('click', enableSound, true);
    window.addEventListener('keydown', enableSound, true);
    window.addEventListener('touchstart', enableSound, true);
}

export const playNotificationSound = async (isManual: boolean = false) => {
    // Check if sound is enabled in settings via config
    const { soundEnabled } = getNotificationConfig();

    if (!soundEnabled && !isManual) {
        return;
    }

    // If manual (button click), we force resume and set the flag
    if (isManual) {
        hasInteracted = true;
    }

    // If we haven't interacted yet, we strictly block to avoid errors
    if (!hasInteracted) {
        return; 
    }

    // Initialize if needed
    initAudio();
    if (!audioCtx) return;

    try {
        // Ensure context is running BEFORE playing
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
        }

        const currentTime = audioCtx.currentTime;
        
        // Create a pleasant notification chime (similar to macOS)
        // Using two notes: C6 (1046.5 Hz) and E6 (1318.5 Hz)
        const playNote = (frequency: number, startTime: number, duration: number) => {
            const oscillator = audioCtx!.createOscillator();
            const gainNode = audioCtx!.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx!.destination);

            // Use sine wave for a softer, more pleasant sound
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, startTime);
            
            // Smooth envelope for natural, resonant sound
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02); // Quick attack
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Long, smooth decay

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };

        // Play two-tone chime with longer duration (C6 -> E6)
        playNote(1046.5, currentTime, 0.5); // C6 note - longer resonance
        playNote(1318.5, currentTime + 0.12, 0.6); // E6 note - even longer tail
        
        console.log("Notification chime played");

    } catch (error) {
        console.error("Audio generation failed", error);
    }
};

// -----------------------Toastify functions-----------------------//

const toastProperty: any = (color: any) => {
    // Read position from config
    const { position } = getNotificationConfig();
    
    // Clean up position string if needed (though config should have clean string)
    const cleanPosition = position.replace(/"/g, '');

    return {
        position: cleanPosition,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: color, // light, dark, colored
        transition: Bounce,
        zIndex: 20000,
    };
};

// status -> "info","success","warn","error"
export const displayToastify: any = (message: any, color: any, status: any) => {
    playNotificationSound(); // Play sound on toast
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

export const ToastifyContainer = () => (
    <ToastContainer style={{ zIndex: 20000 }} />
);

// -------------------------------------------------------- //

export const handleClickForBlinkNotification = (
    color: any,
    status: string,
    dispatch: any,
) => {
    const { blinkSettings } = getNotificationConfig();
    
    // Check master blink switch
    const masterBlinkEnabled = getItem(BLINK_NOTIFICATIONS_ENABLED_KEY) ?? false;
    if (!masterBlinkEnabled) return;

    const isEnabled = blinkSettings[status] ?? true;

    if (!isEnabled) return;

    const colorMap: Record<string, string> = {
        SUCCESS: color?.success,
        ERROR: color?.error,
        WARNING: color?.warning,
        INFO: color?.info,
    };

    const blinkColor = colorMap[status] || 'gray';
    dispatch(setBlinkColor(blinkColor));
    dispatch(triggerBlink());
    
    // Play notification sound for background blink
    playNotificationSound();
};

// ---------------- Error inside catch -------------------- //

export const catchError = (error: any, darkTheme: any) => {
    const nonPremiumErrorsForSpotify = [
        'Forbidden.',
        'Player command failed: Premium required',
    ];
    const noPlayableDeviceErrorsForSpotify = [
        'Device not found',
        'Id not found',
    ];

    const userNotRegisteredErrorsForSpotify = ['Access forbidden'];

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
            const isNonPremiumError = nonPremiumErrorsForSpotify.some((err) =>
                errorDetails?.toLowerCase().includes(err.toLowerCase()),
            );

            const isUserRegisteredError =
                userNotRegisteredErrorsForSpotify.some((err) =>
                    errorDetails?.toLowerCase().includes(err.toLowerCase()),
                );

            const isNoPlayableDeviceError =
                noPlayableDeviceErrorsForSpotify.some((err) =>
                    errorDetails?.toLowerCase().includes(err.toLowerCase()),
                );

            let messageToShow;

            if (isNonPremiumError) {
                messageToShow = spotifyNonPremiumWarning;
            } else if (isUserRegisteredError) {
                messageToShow = spotifyUserNotRegisteredWarning;
            } else if (isNoPlayableDeviceError) {
                messageToShow = spotifyNoPlayableDeviceWarning;
            } else {
                messageToShow = errorDetails;
            }

            displayToastify(
                messageToShow,
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
        id: 1,
        label: 'RGB',
        value: 'gadget/rgb',
        remote: false,
    },
    {
        id: 2,
        label: 'Light',
        value: 'appliance/light',
        remote: false,
    },
    {
        id: 3,
        label: 'Fan',
        value: 'appliance/fan',
        remote: true,
    },
    {
        id: 4,
        label: 'Switch',
        value: 'appliance/switch',
        remote: false,
    },
    {
        id: 5,
        label: 'Television',
        value: 'appliance/television',
        remote: true,
    },
    {
        id: 6,
        label: 'Air Conditioner',
        value: 'appliance/airConditioner',
        remote: true,
    },
    {
        id: 7,
        label: 'Music',
        value: 'appliance/music',
        remote: false,
    },
    {
        id: 8,
        label: 'Freezer',
        value: 'appliance/freezer',
        remote: false,
    },
    {
        id: 9,
        label: 'Dishwasher',
        value: 'appliance/dishwasher',
        remote: false,
    },
    {
        id: 10,
        label: 'Refrigerator',
        value: 'appliance/refrigerator',
        remote: false,
    },
    {
        id: 11,
        label: 'Microwave',
        value: 'appliance/microwave',
        remote: false,
    },
    {
        id: 12,
        label: 'Washing Machine',
        value: 'appliance/washingMachine',
        remote: false,
    }
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
            icon = <SiNano />;
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
        case 'AIRCONDITIONER':
            icon = <TbAirConditioning />;
            break;
        case 'TELEVISION':
            icon = <TbDeviceTvOld />;
            break;
        case 'MUSIC':
            icon = <BsMusicPlayerFill />;
            break;
        case 'FREEZER':
            icon = <TbFreezeRow />;
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
        case 'DISHWASHER':
            icon = <BiSolidWasher />;
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
    currentValue: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number,
) => {
    let result =
        ((currentValue - in_min) * (out_max - out_min)) / (in_max - in_min) +
        out_min;
    return Math.round(result);
};

export const ConvertTheRange = (
    currentValue: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number,
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

export const logger = (file: string) => {
    const enable_logging: boolean = true;
    if (enable_logging) {
        console.log(`Logging for ${file}`);
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

export const reloadPage = () => {
    window.location.reload();
};

export const defaultOnSuccess = () => {};
export const defaultOnError = () => {};

export function getOffsetAndLimit(
    pageNumber: number,
    recordsPerPage: number,
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

export const navigateTo = (navigate: any, to: any) => {
    navigate(to);
};

// ******************* To enable search option in different pages, add uri **********************//
export const uriArray = [
    RoutePath.CoreApplication_Room,
    RoutePath.SelectProfileConfig,
];
export const isSearchActive = (uriArray: any, uri: any) => {
    return uriArray?.some((item: any) => uri?.includes(item));
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

export const trimToNChars = (str: string, lng: number) => {
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
